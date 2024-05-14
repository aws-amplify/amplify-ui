import React, { useMemo } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { Label } from '../Label';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { TextFieldProps } from './types';

export const TEXTFIELD_CONTAINER_TEST_ID = 'amplify__text-field-container';
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
  const themedStyle = useMemo(() => getThemedStyles(theme), [theme]);

  const fieldContainerStyle: ViewStyle = useMemo(
    () => ({
      ...themedStyle.fieldContainer,
      ...(disabled && themedStyle.disabled),
      ...(error && themedStyle.error),
    }),
    [disabled, error, themedStyle]
  );

  return (
    <View
      testID={TEXTFIELD_CONTAINER_TEST_ID}
      style={[themedStyle.container, style]}
    >
      {label ? (
        <Label
          accessibilityLabel={label}
          style={[themedStyle.label, labelStyle]}
        >
          {label}
        </Label>
      ) : null}
      <View
        accessible
        style={fieldContainerStyle}
        testID={INPUT_CONTAINER_TEST_ID}
      >
        <TextInput
          {...rest}
          accessible={accessible}
          accessibilityLabel={label ? undefined : accessibilityLabel}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ disabled, ...accessibilityState }}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          placeholderTextColor={theme.tokens.colors.font.tertiary}
          style={[themedStyle.field, fieldStyle]}
        />
        {endAccessory ?? null}
      </View>
      {error && errorMessage ? (
        <Label style={errorMessageStyle}>{errorMessage}</Label>
      ) : null}
    </View>
  );
}
