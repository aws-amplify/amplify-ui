import React, { useMemo } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { Label } from '../Label';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { TextFieldProps } from './types';

export const INPUT_CONTAINER_TEST_ID = 'amplify__text-field__input-container';

export default function TextField({
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessible = true,
  autoCapitalize = 'none',
  disabled,
  endAccessory,
  error,
  errorMessage,
  errorMessageStyle,
  fieldStyle,
  label,
  labelStyle,
  style,
  ...rest
}: TextFieldProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const inputContainerStyle: ViewStyle = useMemo(
    () => ({
      ...themedStyle.inputContainer,
      ...(disabled && themedStyle.disabled),
    }),
    [disabled, themedStyle]
  );

  return (
    <View
      accessible={accessible}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled, ...accessibilityState }}
      style={[themedStyle.container, style]}
    >
      {label ? (
        <Label style={[themedStyle.label, labelStyle]}>{label}</Label>
      ) : null}
      <View style={inputContainerStyle} testID={INPUT_CONTAINER_TEST_ID}>
        <TextInput
          {...rest}
          accessible={accessible}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          placeholderTextColor={theme.tokens.colors.font.tertiary}
          selectionColor={theme.tokens.colors.font.primary}
          style={[themedStyle.input, fieldStyle]}
        />
        {endAccessory ?? null}
      </View>
      {error && errorMessage ? (
        <Label style={errorMessageStyle}>{errorMessage}</Label>
      ) : null}
    </View>
  );
}
