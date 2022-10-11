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
  outerEndComponent,
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
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          {...rest}
          accessible={accessible}
          editable={!disabled}
        />
        {outerEndComponent && <View>{outerEndComponent}</View>}
      </View>
      {error && errorMessage ? (
        <Label style={errorMessageStyle}>{errorMessage}</Label>
      ) : null}
    </View>
  );
}
