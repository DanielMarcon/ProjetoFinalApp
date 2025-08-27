import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function CustomButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? colors.primaryLight : colors.primaryDark,
          borderColor: pressed ? colors.primaryLight : colors.primaryDark,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      android_ripple={{ color: colors.primaryLight }}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.text,
            { color: pressed ? '#4B0082' : '#FFF' }, // texto branco normal, roxo escuro ao pressionar
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
