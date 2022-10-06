import React, { useMemo } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { Label } from '../Label';

import { styles } from './styles';
import { TextFieldProps } from './types';

export default function TextField({
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessible = true,
  containerStyle,
  disabled,
  error,
  errorMessage,
  errorMessageStyle,
  inputStyle,
  label,
  labelStyle,
  ...rest
}: TextFieldProps): JSX.Element {
  const inputContainerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      ...(disabled && styles.disabled),
    }),
    [disabled]
  );

  return (
    <View
      accessible={accessible}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled, ...accessibilityState }}
      style={[inputContainerStyle, containerStyle]}
    >
      {label ? <Label style={labelStyle}>{label}</Label> : null}
      <TextInput
        {...rest}
        accessible={accessible}
        editable={!disabled}
        style={[styles.input, inputStyle]}
      />
      {error ? <Label style={errorMessageStyle}>{errorMessage}</Label> : null}
    </View>
  );
}
