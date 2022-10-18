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
  disabled,
  error,
  errorMessage,
  errorMessageStyle,
  fieldStyle,
  label,
  labelStyle,
  outerEndComponent,
  style,
  ...rest
}: TextFieldProps): JSX.Element {
  const fieldContainerStyle: ViewStyle = useMemo(
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
      style={[fieldContainerStyle, style]}
    >
      {label ? <Label style={labelStyle}>{label}</Label> : null}
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          style={[styles.input, fieldStyle]}
          accessible={accessible}
          editable={!disabled}
        />
        {outerEndComponent ?? null}
      </View>
      {error && errorMessage ? (
        <Label style={errorMessageStyle}>{errorMessage}</Label>
      ) : null}
    </View>
  );
}
