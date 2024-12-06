import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootStackParamList, DrawerParamList } from "../types/navigationTypes";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home";
import LoginScreen from "../screens/login";
import AccountsScreen from "../screens/accounts";
import RegisterScreen from "../screens/register";
import CreateAccountScreen from "../screens/createAccount";
import EditAccountScreen from "../screens/editAccount";

import { AuthProvider, useAuth } from "../context/authContext";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: any) => {
        const { logout } = useAuth();
    
        const handleLogout = async () => {
            await logout();
            props.navigation.closeDrawer();
        };
    
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    icon={({ size }) => (
                        <Ionicons name="log-out-outline" size={size} color={"white"} />
                    )}
                    onPress={handleLogout}
                />
            </DrawerContentScrollView>
        );
    };

const AppDrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="Financy"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
            drawerStyle: {
                backgroundColor: "#008B8B",
            },
            drawerLabelStyle: {
                fontSize: 16,
            },
            drawerActiveTintColor: "#004C4C",
        }}
    >
        <Drawer.Screen
            name="Financy"
            component={HomeScreen}
            options={{
                drawerLabel: "Início",
                drawerIcon: ({ size }) => (
                    <Ionicons name="home-outline" size={size} color={"white"} />
                ),
            }}
        />
        <Drawer.Screen
            name="Minhas Contas"
            component={AccountsScreen}
            options={{
                drawerLabel: "Minhas Contas",
                drawerIcon: ({ size }) => (
                    <Ionicons name="wallet-outline" size={size} color={"white"} />
                ),
            }}
        />
        <Drawer.Screen
            name="Adicionar Conta"
            component={CreateAccountScreen}
            options={{
                drawerLabel: "Adicionar Conta",
                drawerIcon: ({ size }) => (
                    <Ionicons name="add" size={size} color={"white"}/>
                )
            }}
        />
    </Drawer.Navigator>
);
// StackNavigator para o Drawer
const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Drawer"
                component={AppDrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditAccount"
                component={EditAccountScreen}
                options={{
                    title: "Editar Conta",
                    headerStyle: { backgroundColor: "#008B8B"},
                    headerTintColor: "#FFFFFF",
                }}
            />
        </Stack.Navigator>
    )
};

// Stack Navigator para controle de autenticação
const AuthStackNavigator = () => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default () => (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
);