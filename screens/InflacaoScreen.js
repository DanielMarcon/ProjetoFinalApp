import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InflacaoForm from '../components/InflacaoForm';

export default function InflacaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Inflação</Text>
      <InflacaoForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
