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
          borderColor: pressed ? colors.primaryDark : 'black',           // preto no normal, roxo escuro ao pressionar
          backgroundColor: pressed ? colors.primaryLight : 'transparent', // fundo roxo claro ao pressionar
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      android_ripple={{ color: colors.primaryLight }}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.text,
            { color: pressed ? colors.primaryDark : 'black' }, // texto preto no normal, roxo escuro ao pressionar
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
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
