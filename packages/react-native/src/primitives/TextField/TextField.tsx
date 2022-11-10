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

  const fieldContainerStyle: ViewStyle = useMemo(
    () => ({
      ...themedStyle.container,
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
      style={[fieldContainerStyle, style]}
    >
      {label ? <Label style={labelStyle}>{label}</Label> : null}
      <View style={themedStyle.inputContainer} testID={INPUT_CONTAINER_TEST_ID}>
        <TextInput
          {...rest}
          accessible={accessible}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
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
