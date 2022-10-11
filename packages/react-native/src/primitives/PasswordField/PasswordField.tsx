import React, { useState } from 'react';

import { icons } from '../../assets';
import { IconButton } from '../IconButton';
import { TextField } from '../TextField';
import { PasswordFieldProps } from './types';

export default function PasswordField({
  disabled,
  hideShowPassword = false,
  iconStyle,
  iconAccessibilityLabel,
  ...rest
}: PasswordFieldProps): JSX.Element {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <TextField
      {...rest}
      disabled={disabled}
      secureTextEntry={secureTextEntry}
      outerEndComponent={
        hideShowPassword ? null : (
          <IconButton
            accessibilityLabel={iconAccessibilityLabel}
            disabled={disabled}
            iconStyle={iconStyle}
            source={secureTextEntry ? icons.visibilityOff : icons.visibility}
            onPress={handleSecureTextEntry}
          />
        )
      }
    />
  );
}
