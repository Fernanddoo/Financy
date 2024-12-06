import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import api from "../api/api";
import { useAuth } from "../context/authContext";

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      try {
        const response = await api.post("/auth/login", { email, password });
        const { token } = response.data;
        await login(token);
        // Remove the manual navigation
        // navigation.replace("Home");
      } catch (error) {
        console.error("Login failed", error);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#00FA9A" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Registrar</Text>
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

export default LoginScreen;