import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Simulador Financeiro</Text>
      <Button title="Simulador de Juros Compostos" onPress={() => navigation.navigate('Juros')} />
      <View style={{ height: 20 }} />
      <Button title="Calculadora de Inflação" onPress={() => navigation.navigate('Inflacao')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
});
