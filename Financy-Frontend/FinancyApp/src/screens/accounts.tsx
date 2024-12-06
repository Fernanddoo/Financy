import React, { useState, useCallback } from 'react';
import { View, Text, Alert, Button, StyleSheet, ScrollView } from 'react-native';
import api from '../api/api';
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import Account from "../types/account"

type AccountsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditAccount'>;

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const navigation = useNavigation<AccountsScreenNavigationProp>();

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await api.get("/accounts");
      const fetchedAccounts = response.data;
      setAccounts(fetchedAccounts);

      // Vê quais anos possuem contas criadas 
      const yearsSet = new Set<string>();
      fetchedAccounts.forEach((account: Account) => {
        const accountYear = new Date(account.dueDate).getFullYear().toString();
        yearsSet.add(accountYear);
      });

      const yearsArray = Array.from(yearsSet).sort();
      setYearOptions(yearsArray);

      // Se não houver nenhum ano selecionado, pega o primeiro
      if (!yearsArray.includes(selectedYear)) {
        setSelectedYear(yearsArray[0]);
      }
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  }, [selectedYear]);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts])
  );

  const handleMarkAsPaid = async (id: number) => {
    try {
      await api.put(`/accounts/${id}`, { paid: true });
      fetchAccounts();
      Alert.alert("Sucesso", "Conta marcada como paga!");
    } catch (error) {
      console.error("Error confirming payment:", error);
      Alert.alert("Erro", "Não foi possível confirmar o pagamento.");
    }
  };

  const handleEditAccount = (account: Account) => {
    navigation.navigate('EditAccount', { account });
  };

  const filteredAccounts = accounts.filter(account => {
    const dueDate = new Date(account.dueDate);
    const accountMonth = dueDate.getMonth();
    const accountYear = dueDate.getFullYear();
    return accountMonth.toString() === selectedMonth && accountYear.toString() === selectedYear;
  });

  const unpaidAccounts = filteredAccounts.filter(account => !account.paid);
  const paidAccounts = filteredAccounts.filter(account => account.paid);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Janeiro" value="0" />
          <Picker.Item label="Fevereiro" value="1" />
          <Picker.Item label="Março" value="2" />
          <Picker.Item label="Abril" value="3" />
          <Picker.Item label="Maio" value="4" />
          <Picker.Item label="Junho" value="5" />
          <Picker.Item label="Julho" value="6" />
          <Picker.Item label="Agosto" value="7" />
          <Picker.Item label="Setembro" value="8" />
          <Picker.Item label="Outubro" value="9" />
          <Picker.Item label="Novembro" value="10" />
          <Picker.Item label="Dezembro" value="11" />
        </Picker>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {yearOptions.map(year => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <ScrollView>
        <Text style={styles.sectionTitle}>Contas à pagar</Text>
        {unpaidAccounts.map(item => (
          <View key={item.id} style={[styles.card, { backgroundColor: '#E0FFFF' }]}>
            <Text>Nome: {item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Valor: {item.value}</Text>
            <Text>Vencimento: {item.dueDate}</Text>
            <Text>Status: {item.paid ? "Pago" : "Não pago"}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Pago?"
                onPress={() => handleMarkAsPaid(item.id)}
                color="#00FA9A"
              />
              <Button
                title="Editar"
                onPress={() => handleEditAccount(item)}
                color="gray"
              />
              <Button
                title="Deletar"
                onPress={async () => {
                  await api.delete(`accounts/${item.id}`);
                  fetchAccounts();
                }}
                color="red"
              />
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Contas Pagas</Text>
        {paidAccounts.map(item => (
          <View key={item.id} style={[styles.card, { backgroundColor: '#D3D3D3' }]}>
            <Text>Nome: {item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Valor: {item.value}</Text>
            <Text>Vencimento: {item.dueDate}</Text>
            <Text>Status: {item.paid ? "Pago" : "Não pago"}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => handleEditAccount(item)}
                color="gray"
              />
              <Button
                title="Deletar"
                onPress={async () => {
                  await api.delete(`accounts/${item.id}`);
                  fetchAccounts();
                }}
                color="red"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: 50,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AccountsScreen;
