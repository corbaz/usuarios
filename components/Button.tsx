import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  style?: ViewStyle;
}

export function Button({ text, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
