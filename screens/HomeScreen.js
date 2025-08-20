import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const [saldo, setSaldo] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [operacao, setOperacao] = useState(null);
  const [valor, setValor] = useState('');

  const abrirModal = (tipo) => {
    setOperacao(tipo);
    setValor('');
    setModalVisible(true);
  };

  const confirmarOperacao = () => {
    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Valor inválido', 'Digite um valor numérico positivo.');
      return;
    }

    if (operacao === 'saque') {
      if (valorNumerico > saldo) {
        Alert.alert('Saldo insuficiente', 'Você não tem saldo suficiente para esse saque.');
        return;
      }
      setSaldo(saldo - valorNumerico);
    } else if (operacao === 'deposito') {
      setSaldo(saldo + valorNumerico);
    }

    setModalVisible(false);
  };

  const sacarTudo = () => {
    setValor(saldo.toFixed(2).replace('.', ','));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Simulador Financeiro do Mubank</Text>

      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo disponível</Text>
        <Text style={styles.saldoValor}>R$ {saldo.toFixed(2).replace('.', ',')}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => abrirModal('deposito')}>
            <Text style={styles.actionButtonText}>Depósito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => abrirModal('saque')}>
            <Text style={styles.actionButtonText}>Saque</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Passando saldoDisponivel para a tela de Juros */}
      <CustomButton
        title="Simulador de Juros Compostos"
        onPress={() => navigation.navigate('Juros', { saldoDisponivel: saldo })}
      />
      <CustomButton
        title="Calculadora de Inflação"
        onPress={() => navigation.navigate('Inflacao')}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {operacao === 'deposito' ? 'Depósito' : 'Saque'} - Informe o valor:
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite o valor"
              placeholderTextColor={colors.textPrimary}
              value={valor}
              onChangeText={setValor}
              autoFocus
            />

            {operacao === 'saque' && (
              <TouchableOpacity style={styles.sacarTudoButton} onPress={sacarTudo}>
                <Text style={styles.sacarTudoButtonText}>Sacar tudo</Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmarOperacao}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saldoContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.textPrimary,
    borderWidth: 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  saldoLabel: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  saldoValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 25,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 12,
    padding: 10,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 20,
    backgroundColor: 'rgba(241, 234, 234, 0.1)',
  },
  sacarTudoButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  sacarTudoButtonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  modalButtonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonCancel: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 25,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
