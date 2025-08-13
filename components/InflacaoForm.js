import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { calcularInflacao } from '../utils/calcularInflacao';

export default function InflacaoForm() {
  const [valorAtual, setValorAtual] = useState('');
  const [taxaInflacao, setTaxaInflacao] = useState('');
  const [tempoAnos, setTempoAnos] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    if (!valorAtual || !taxaInflacao || !tempoAnos) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const va = parseFloat(valorAtual);
    const taxa = parseFloat(taxaInflacao);
    const tempo = parseInt(tempoAnos);

    if (isNaN(va) || isNaN(taxa) || isNaN(tempo)) {
      Alert.alert('Erro', 'Digite valores numéricos válidos.');
      return;
    }

    const res = calcularInflacao(va, taxa, tempo);
    setResultado(res);
  };

  const handleLimpar = () => {
    setValorAtual('');
    setTaxaInflacao('');
    setTempoAnos('');
    setResultado(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.form}>
        <Text style={styles.label}>Valor Atual (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorAtual}
          onChangeText={setValorAtual}
        />

        <Text style={styles.label}>Taxa de Inflação Anual (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={taxaInflacao}
          onChangeText={setTaxaInflacao}
        />

        <Text style={styles.label}>Tempo (anos):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoAnos}
          onChangeText={setTempoAnos}
        />

        <Button title="Calcular" onPress={handleCalcular} />

        {resultado && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTexto}>Valor Futuro Corrigido: R$ {resultado.valorFuturo}</Text>
            <Text style={styles.resultadoTexto}>Perda de Poder de Compra: R$ {resultado.perdaPoderCompra}</Text>
            <View style={{ marginTop: 10 }}>
              <Button title="Limpar" onPress={handleLimpar} color="#999" />
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
  },
  resultado: {
    marginTop: 20,
    backgroundColor: '#fff3e6',
    padding: 10,
    borderRadius: 6,
  },
  resultadoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
