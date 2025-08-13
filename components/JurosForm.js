import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { calcularJurosCompostos } from '../utils/calcularJuros';
import CustomButton from './CustomButton';
import { colors } from '../theme';

export default function JurosForm() {
  const [valorInicial, setValorInicial] = useState('');
  const [taxaMensal, setTaxaMensal] = useState('');
  const [tempoMeses, setTempoMeses] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
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

    if (
      isNaN(vi) ||
      isNaN(taxa) ||
      isNaN(tempo) ||
      (aporteMensal !== '' && isNaN(aporte))
    ) {
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
    setAporteMensal('');
    setResultado(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Valor Inicial (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorInicial}
          onChangeText={setValorInicial}
          placeholder="Ex: 1000"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Taxa de Juros Mensal (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={taxaMensal}
          onChangeText={setTaxaMensal}
          placeholder="Ex: 1.5"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Tempo (meses):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoMeses}
          onChangeText={setTempoMeses}
          placeholder="Ex: 12"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Aporte Mensal (R$) (Opcional):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={aporteMensal}
          onChangeText={setAporteMensal}
          placeholder="Ex: 100"
          placeholderTextColor="#999"
        />

        <CustomButton title="Calcular" onPress={handleCalcular} />

        {resultado && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTexto}>
              Valor Final: R$ {resultado.valorFinal}
            </Text>
            <Text style={styles.resultadoTexto}>
              Juros Ganhos: R$ {resultado.jurosGanhos}
            </Text>
            <CustomButton
              title="Limpar"
              onPress={handleLimpar}
              disabled={false}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 6,
  },
  resultado: {
    marginTop: 20,
    backgroundColor: '#E8DFFF',
    padding: 15,
    borderRadius: 8,
  },
  resultadoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 6,
  },
});
