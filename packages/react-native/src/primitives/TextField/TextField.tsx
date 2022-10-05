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
  inputStyle,
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
        {...rest}
        accessibilityLabel={accessibilityLabel ?? label}
        editable={!disabled}
        style={[styles.input, inputStyle]}
      />
      {error ? <Label style={errorMessageStyle}>{errorMessage}</Label> : null}
    </View>
  );
}
