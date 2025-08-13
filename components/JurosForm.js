import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { calcularJurosCompostos } from '../utils/calcularJuros';

export default function JurosForm() {
  const [valorInicial, setValorInicial] = useState('');
  const [taxaMensal, setTaxaMensal] = useState('');
  const [tempoMeses, setTempoMeses] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');  // Novo estado
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    if (!valorInicial || !taxaMensal || !tempoMeses) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const vi = parseFloat(valorInicial);
    const taxa = parseFloat(taxaMensal);
    const tempo = parseInt(tempoMeses);
    const aporte = aporteMensal ? parseFloat(aporteMensal) : 0;

    if (isNaN(vi) || isNaN(taxa) || isNaN(tempo) || (aporteMensal !== '' && isNaN(aporte))) {
      Alert.alert('Erro', 'Digite valores numéricos válidos.');
      return;
    }

    const res = calcularJurosCompostos(vi, taxa, tempo, aporte);
    setResultado(res);
  };

  const handleLimpar = () => {
    setValorInicial('');
    setTaxaMensal('');
    setTempoMeses('');
    setAporteMensal('');  // Limpar também aporte mensal
    setResultado(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.form}>
        <Text style={styles.label}>Valor Inicial (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorInicial}
          onChangeText={setValorInicial}
        />

        <Text style={styles.label}>Taxa de Juros Mensal (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={taxaMensal}
          onChangeText={setTaxaMensal}
        />

        <Text style={styles.label}>Tempo (meses):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoMeses}
          onChangeText={setTempoMeses}
        />

        <Text style={styles.label}>Aporte Mensal (R$) (Opcional):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={aporteMensal}
          onChangeText={setAporteMensal}
          placeholder="0"
        />

        <Button title="Calcular" onPress={handleCalcular} />

        {resultado && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTexto}>Valor Final: R$ {resultado.valorFinal}</Text>
            <Text style={styles.resultadoTexto}>Juros Ganhos: R$ {resultado.jurosGanhos}</Text>
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
    backgroundColor: '#e6f2ff',
    padding: 10,
    borderRadius: 6,
  },
  resultadoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
