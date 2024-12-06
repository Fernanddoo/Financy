import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/authContext";
import AppNavigator from "./src/navigation/appNavigator";

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
            <StatusBar style="auto" />
        </AuthProvider>
    );
}
