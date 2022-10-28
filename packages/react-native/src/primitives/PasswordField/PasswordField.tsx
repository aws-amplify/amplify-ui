import React, { useState } from 'react';

import { icons } from '../../assets';
import { IconButton } from '../IconButton';
import { TextField } from '../TextField';
import { PasswordFieldProps } from './types';

export default function PasswordField({
  disabled,
  showPasswordButton = true,
  iconStyle,
  iconAccessibilityLabel,
  secureTextEntry = true,
  ...rest
}: PasswordFieldProps): JSX.Element {
  const [obscureText, setObscureText] = useState(secureTextEntry);

  const handleOnPress = React.useCallback(() => {
    setObscureText(!obscureText);
  }, [obscureText]);

  return (
    <TextField
      {...rest}
      disabled={disabled}
      secureTextEntry={obscureText}
      endAccessory={
        showPasswordButton ? (
          <IconButton
            accessibilityLabel={iconAccessibilityLabel}
            disabled={disabled}
            iconStyle={iconStyle}
            size={16}
            source={obscureText ? icons.visibilityOff : icons.visibilityOn}
            onPress={handleOnPress}
          />
        ) : null
      }
    />
  );
}
