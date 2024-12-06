// src/screens/editAccount.tsx
import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import api from "../api/api";

interface EditAccountScreenProps {
  navigation: any;
  route: any;
}

const EditAccountScreen: React.FC<EditAccountScreenProps> = ({ navigation, route }) => {
  const { account } = route.params;

  const [name, setName] = useState(account.name);
  const [description, setDescription] = useState(account.description || "");
  const [value, setValue] = useState(account.value.toString());
  const [dueDate, setDueDate] = useState(account.dueDate);
  const [paid, setPaid] = useState(account.paid);

  const handleUpdateAccount = async () => {
    if (!name || !value || !dueDate) {
      Alert.alert("Erro", "Os campos Nome, Valor e Data de Vencimento são obrigatórios.");
      return;
    }

    try {
      const response = await api.put(`/accounts/${account.id}`, {
        name,
        description,
        value: parseFloat(value),
        dueDate,
        paid,
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Conta atualizada com sucesso!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      Alert.alert("Erro", "Não foi possível atualizar a conta. Tente novamente mais tarde.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Vencimento (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        placeholderTextColor="#999"
      />
      <Text style={styles.switchContainer}>Status Pago</Text>
      <Switch
        value={paid}
        onValueChange={setPaid}
        thumbColor={paid ? "#00FA9A" : "#ccc"}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#00FA9A" }]}
        onPress={handleUpdateAccount}
      >
        <Text style={styles.buttonText}>Atualizar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    color: "#333",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default EditAccountScreen;
