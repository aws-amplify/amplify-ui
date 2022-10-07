import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '../../hooks';
import { styles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  children,
  containerStyle,
  textStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedButtonStyle = theme.tokens?.components.button;
  return (
    <Pressable
      style={[styles.container, themedButtonStyle?.container, containerStyle]}
      {...pressableProps}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, themedButtonStyle?.text, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
