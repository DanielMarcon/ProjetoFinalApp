import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

const colors = {
  primaryLight: '#EDE7F6',   // Lilás claro
  primaryDark: '#2E0854',    // Roxo escuro
  depositGreen: '#3CB371',   // Verde médio
  depositBlue: '#1a99c0ff',   // Azul médio
  withdrawRed: '#D32F2F',    // Vermelho vibrante
  white: '#FFFFFF',
  placeholder: 'rgba(46, 8, 84, 0.6)', // roxo escuro translúcido
};

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
          <TouchableOpacity style={styles.depositoButton} onPress={() => abrirModal('deposito')}>
            <Text style={styles.depositoButtonText}>Depósito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saqueButton} onPress={() => abrirModal('saque')}>
            <Text style={styles.saqueButtonText}>Saque</Text>
          </TouchableOpacity>
        </View>
      </View>

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
              placeholderTextColor={colors.placeholder}
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
              <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmarOperacao}>
                <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
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
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: colors.primaryDark,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saldoContainer: {
    backgroundColor: colors.white,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saldoLabel: {
    fontSize: 18,
    color: colors.primaryDark,
    marginBottom: 6,
  },
  saldoValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  depositoButton: {
    flex: 1,
    backgroundColor: colors.depositGreen,
    borderRadius: 25,
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.depositGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  saqueButton: {
    flex: 1,
    backgroundColor: colors.withdrawRed,
    borderRadius: 25,
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.withdrawRed,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  depositoButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  saqueButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(46,8,84,0.85)', // roxo escuro mais opaco para destaque do modal
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 25,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.primaryDark,
    borderRadius: 12,
    padding: 14,
    fontSize: 20,
    color: colors.primaryDark,
    marginBottom: 25,
    backgroundColor: '#F5F5F5',
  },
  sacarTudoButton: {
    backgroundColor: colors.depositBlue,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.depositBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
  },
  sacarTudoButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: colors.depositGreen,
    borderRadius: 25,
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: colors.depositGreen,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
  },
  modalConfirmButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: colors.withdrawRed,
    borderRadius: 25,
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: colors.withdrawRed,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
  },
  modalCancelButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
