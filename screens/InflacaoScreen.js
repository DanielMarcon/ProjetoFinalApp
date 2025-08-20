import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InflacaoForm from '../components/InflacaoForm';
import { colors } from '../theme';

export default function InflacaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Inflação do Mubank</Text>
      <InflacaoForm />
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
