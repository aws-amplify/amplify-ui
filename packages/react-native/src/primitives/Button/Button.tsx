import React from 'react';
import { Pressable, Text } from 'react-native';

import { usePressableStyles, useTheme } from '../../hooks';
import { baseStyles, getThemedStyles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  accessibilityRole = 'button',
  children,
  disabled,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedButtonStyle = getThemedStyles(theme);

  const containerStyle = usePressableStyles({
    disabled: disabled,
    disabledStyle: { ...baseStyles.disabled, ...themedButtonStyle.disabled },
    style: style,
    themedStyle: { ...baseStyles.container, ...themedButtonStyle.container },
  });

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      style={containerStyle}
      {...pressableProps}
    >
      {typeof children === 'string' ? (
        <Text style={[baseStyles.text, themedButtonStyle.text, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
