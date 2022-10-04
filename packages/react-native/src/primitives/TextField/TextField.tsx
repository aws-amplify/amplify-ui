import React, { useMemo } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { Label } from '../Label';

import { styles } from './styles';
import { TextFieldProps } from './types';

export default function TextField({
  accessibilityLabel,
  containerStyle,
  disabled,
  error,
  errorMessage,
  errorMessageStyle,
  label,
  labelStyle,
  password,
  textStyle,
  type = 'default',
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
    <View style={[inputContainerStyle, containerStyle]}>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
      <TextInput
        accessible
        accessibilityLabel={accessibilityLabel ?? label}
        style={[styles.text, textStyle]}
        editable={!disabled}
        secureTextEntry={password}
        keyboardType={type}
        {...rest}
      />
      {error ? <Label style={errorMessageStyle}>{errorMessage}</Label> : null}
    </View>
  );
}
