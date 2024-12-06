import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, RefreshControl } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { BarChart } from "react-native-chart-kit";
import api from "../api/api";
import { useFocusEffect } from '@react-navigation/native';
import Account from "../types/account"

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [data, setData] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPaidAccounts = useCallback(async () => {
    try {
      const response = await api.get("/accounts");
      const accounts: Account[] = response.data;

      const yearsSet = new Set<string>();
      accounts.forEach((account: Account) => {
        if (account.paid) {
          const date = new Date(account.dueDate);
          if (!isNaN(date.getTime())) {
            const accountYear = date.getFullYear().toString();
            yearsSet.add(accountYear);
          }
        }
      });

      const yearsArray = Array.from(yearsSet).sort();
      setYearOptions(yearsArray);

      // Mesma coisa que na AccountsScreen, pega o primeiro ano
      if (!yearsArray.includes(selectedYear)) {
        setSelectedYear(yearsArray[0]);
      }

      const paidAccounts = accounts.filter((account) => {
        if (account.paid) {
          const date = new Date(account.dueDate);
          if (!isNaN(date.getTime())) {
            const accountYear = date.getFullYear();
            return accountYear.toString() === selectedYear;
          } else {
            console.warn("Invalid date format:", account.dueDate);
            return false;
          }
        }
        return false;
      });

      // Agrupa as contas por mês
      const monthlyData: number[] = Array(12).fill(0);
      paidAccounts.forEach((account) => {
        const date = new Date(account.dueDate);
        if (!isNaN(date.getTime())) {
          const month = date.getMonth();
          const value = Number(account.value) || 0;
          monthlyData[month] += value;
        } else {
          console.warn("Invalid date format:", account.dueDate);
        }
      });

      setData(monthlyData);
      const total = monthlyData.reduce((sum, value) => sum + value, 0);
      setTotalPaid(total);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchPaidAccounts();
  }, [fetchPaidAccounts]);

  useFocusEffect(
    useCallback(() => {
      fetchPaidAccounts();
    }, [fetchPaidAccounts])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPaidAccounts();
  }, [fetchPaidAccounts]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Anual</Text>
      <Picker
        selectedValue={selectedYear}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        {yearOptions.map(year => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BarChart
          data={{
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="R$ "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`, // Aqua green
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={0}
        />
        <Text style={styles.totalText}>
          Total Pago no Ano: R$ {totalPaid ? totalPaid.toFixed(2) : "0.00"}
        </Text>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: 'gray',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    color: 'gray',
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default HomeScreen;
