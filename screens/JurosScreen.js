import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JurosForm from '../components/JurosForm';

export default function JurosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Juros Compostos</Text>
      <JurosForm />
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
