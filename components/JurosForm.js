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
import CustomButton2 from './CustomButton2';
import { colors } from '../theme';

export default function JurosForm({ saldoDisponivel }) {
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

    const vi = parseFloat(valorInicial.replace(',', '.'));
    const taxa = parseFloat(taxaMensal.replace(',', '.'));
    const tempo = parseInt(tempoMeses);
    const aporte = aporteMensal ? parseFloat(aporteMensal.replace(',', '.')) : 0;

    if (
      isNaN(vi) ||
      isNaN(taxa) ||
      isNaN(tempo) ||
      (aporteMensal !== '' && isNaN(aporte))
    ) {
      Alert.alert('Erro', 'Digite valores numéricos válidos.');
      return;
    }

    if (vi > saldoDisponivel) {
      Alert.alert(
        'Saldo insuficiente',
        `O valor inicial não pode ser maior que o saldo disponível: R$ ${saldoDisponivel.toFixed(2).replace('.', ',')}`
      );
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

        <Text style={styles.label}>Taxa Mensal (%):</Text>
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

        <Text style={styles.label}>Aporte Mensal (opcional):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={aporteMensal}
          onChangeText={setAporteMensal}
          placeholder="Ex: 100"
          placeholderTextColor="#999"
        />

        <CustomButton2 title="Calcular" onPress={handleCalcular} />

        {resultado && (
  <View style={styles.resultadoContainer}>
    <Text style={styles.resultadoTexto}>
      Investindo{' '}
      <Text style={styles.valorDestacado}>
        R$ {parseFloat(valorInicial).toFixed(2).replace('.', ',')}
      </Text>
      {aporteMensal ? (
        <>
          {' '}com aportes mensais de{' '}
          <Text style={styles.valorDestacado}>
            R$ {parseFloat(aporteMensal).toFixed(2).replace('.', ',')}
          </Text>
        </>
      ) : null}{' '}
      por <Text style={styles.valorDestacado}>{tempoMeses}</Text> meses à uma taxa de{' '}
      <Text style={styles.valorDestacado}>{taxaMensal.replace('.', ',')}%</Text> ao mês,
      você terá um total de{' '}
      <Text style={styles.valorDestacado}>R$ {resultado.valorFinal.replace('.', ',')}</Text> ao final do período.
    </Text>

    <Text style={styles.resultadoTexto}>
      Desse montante,{' '}
      <Text style={styles.valorDestacado}>
        R$ {resultado.jurosGanhos.replace('.', ',')}
      </Text>{' '}
      correspondem a juros ganhos.
    </Text>

    <Text style={styles.resultadoTexto}>
      O total investido (capital inicial + aportes) será de{' '}
      <Text style={styles.valorDestacado}>
        R$ {(parseFloat(valorInicial) + (parseFloat(aporteMensal || 0) * parseInt(tempoMeses))).toFixed(2).replace('.', ',')}
      </Text>.
    </Text>

    <CustomButton2 title="Limpar" onPress={handleLimpar} />
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
    paddingHorizontal: 20,
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

    padding: 15,
    borderRadius: 8,
  },
  resultadoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  valorDestacado: {
    color: colors.primary,
    fontWeight: '700',
  },
  resultadoContainer: {
  marginTop: 20,
  backgroundColor: '#f0f4f8',
  padding: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#cbd5e1',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

resultadoTexto: {
  fontSize: 16,
  fontWeight: '600',
  color: colors.textSecondary || '#1e293b', 
  marginBottom: 12,
  textAlign: 'left',
  lineHeight: 24,
},

valorDestacado: {
  color: colors.primary || '#2563eb', 
  fontWeight: '700',
},


});
