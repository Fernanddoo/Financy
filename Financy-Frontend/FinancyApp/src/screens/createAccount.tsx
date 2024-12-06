import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import api from "../api/api";

const CreateAccountScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleCreateAccount = async () => {
        if (!name || !value || !dueDate) {
            Alert.alert("Erro", "Os campos Nome, Valor e Data de Vencimento são obrigatórios.");
            return;
        }

        try {
            const response = await api.post("/accounts", {
                name,
                description,
                value: parseFloat(value),
                dueDate,
            });

            if (response.status === 201) {
                Alert.alert("Sucesso", "Conta criada com sucesso!", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            }
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente mais tarde.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#00FA9A" }]}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
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
});

export default CreateAccountScreen;
