import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import JurosScreen from './screens/JurosScreen';
import InflacaoScreen from './screens/InflacaoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Simulador Financeiro' }} />
        <Stack.Screen name="Juros" component={JurosScreen} options={{ title: 'Juros Compostos' }} />
        <Stack.Screen name="Inflacao" component={InflacaoScreen} options={{ title: 'Calculadora de Inflação' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}