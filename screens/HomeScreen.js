import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Simulador Financeiro</Text>
      <CustomButton
        title="Simulador de Juros Compostos"
        onPress={() => navigation.navigate('Juros')}
      />
      <CustomButton
        title="Calculadora de Inflação"
        onPress={() => navigation.navigate('Inflacao')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: colors.textPrimary,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
