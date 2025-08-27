import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { calcularInflacao } from '../utils/calcularInflacao';
import CustomButton from './CustomButton';
import CustomButton2 from './CustomButton2';
import { colors } from '../theme';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Valor Atual (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorAtual}
          onChangeText={setValorAtual}
          placeholder="Ex: 1000"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Taxa de Inflação Anual (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={taxaInflacao}
          onChangeText={setTaxaInflacao}
          placeholder="Ex: 4.5"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Tempo (anos):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoAnos}
          onChangeText={setTempoAnos}
          placeholder="Ex: 5"
          placeholderTextColor="#999"
        />

        <CustomButton2 title="Calcular" onPress={handleCalcular} />

        {resultado && (
  <View style={styles.resultadoContainer}>
    <Text style={styles.resultadoTexto}>
      Considerando o valor atual de{' '}
      <Text style={styles.valorDestacado}>R$ {parseFloat(valorAtual).toFixed(2).replace('.', ',')}</Text>,{' '}
      uma taxa de inflação anual de{' '}
      <Text style={styles.valorDestacado}>{taxaInflacao.replace('.', ',')}%</Text>{' '}
      ao longo de{' '}
      <Text style={styles.valorDestacado}>{tempoAnos}</Text>{' '}
      anos, o valor corrigido pela inflação será de{' '}
      <Text style={styles.valorDestacado}>R$ {resultado.valorFuturo.replace('.', ',')}</Text>.
    </Text>

    <Text style={styles.resultadoTexto}>
      Isso representa uma perda do poder de compra de{' '}
      <Text style={styles.valorDestacado}>R$ {resultado.perdaPoderCompra.replace('.', ',')}</Text>{' '}
      no período.
    </Text>

    <CustomButton2 title="Limpar" onPress={handleLimpar} />
  </View>
)}




    </View>
    </KeyboardAvoidingView >
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
    padding: 15,
    borderRadius: 8,
  },
  resultadoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 6,
  },
  resultadoContainer: {
  marginTop: 20,
  backgroundColor: '#f0f4f8', // Fundo clarinho para o quadro
  padding: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#cbd5e1', // Borda suave
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // Para Android sombra
},

resultadoTexto: {
  fontSize: 16,
  fontWeight: '600',
  color: colors.textSecondary || '#1e293b', // cor do texto principal (você pode ajustar)
  marginBottom: 12,
  textAlign: 'left',
  lineHeight: 24,
},

valorDestacado: {
  color: colors.primary || '#2563eb', // cor destacada, pode ser azul, verde, etc
  fontWeight: '700',
},

});
