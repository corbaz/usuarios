import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text, ViewStyle, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  style?: ViewStyle;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}

export function Button({ text, style, pointerEvents, ...props }: ButtonProps) {
  return (
    <View pointerEvents={pointerEvents}>
      <TouchableOpacity 
        style={[styles.button, style]} 
        {...props}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
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
