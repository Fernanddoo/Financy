import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import api from "../api/api";

const RegisterScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");

    const handleRegister = async () => {
        if (!username || !email || !password) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                username,
                email,
                password,
                contact,
            });

            if (response.status === 201) {
                Alert.alert(
                    "Sucesso",
                    "Conta criada com sucesso! Faça login para continuar.",
                    [{ text: "OK", onPress: () => navigation.navigate("Login") }]
                );
            }
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            Alert.alert(
                "Erro",
                "Não foi possível criar sua conta. Tente novamente mais tarde."
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Contato (opcional)"
        value={contact}
        onChangeText={setContact}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#00FA9A" }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
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

export default RegisterScreen;
