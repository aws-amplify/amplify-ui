import React from 'react';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { TextField } from '../TextField';
import { PhoneNumberFieldProps } from './types';

export default function PhoneNumberField({
  disabled,
  fieldStyle,
  labelStyle,
  style,
  ...rest
}: PhoneNumberFieldProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  return (
    <TextField
      {...rest}
      disabled={disabled}
      fieldStyle={[themedStyle.field, fieldStyle]}
      keyboardType="phone-pad"
      labelStyle={[themedStyle.label, labelStyle]}
      style={[themedStyle.container, style]}
    />
  );
}
