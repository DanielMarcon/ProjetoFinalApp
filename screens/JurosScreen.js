import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JurosForm from '../components/JurosForm';
import { colors } from '../theme';

export default function JurosScreen({ route }) {
  const { saldoDisponivel } = route.params || { saldoDisponivel: 0 }; // padrão 0 para evitar erro

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Juros Compostos do Mubank</Text>
      <JurosForm saldoDisponivel={saldoDisponivel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.textSecondary,
  },
});
