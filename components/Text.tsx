import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

type CustomTextProps = Omit<TextProps, 'pointerEvents'> & {
  style?: TextStyle;
};

export function Text({ style, ...props }: CustomTextProps) {
  return <RNText style={[style]} {...props} />;
}
