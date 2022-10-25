import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  children,
  textStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  return (
    <Pressable {...pressableProps}>
      {typeof children === 'string' ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
