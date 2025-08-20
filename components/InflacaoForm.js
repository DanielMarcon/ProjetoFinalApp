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
          <View style={styles.resultado}>
            <Text style={styles.resultadoTexto}>
              Valor Futuro Corrigido: R$ {resultado.valorFuturo}
            </Text>
            <Text style={styles.resultadoTexto}>
              Perda de Poder de Compra: R$ {resultado.perdaPoderCompra}
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
});
