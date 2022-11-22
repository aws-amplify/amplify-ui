import React, { useState } from 'react';

import { icons } from '../../assets';
import { useTheme } from '../../theme';
import { IconButton } from '../IconButton';
import { TextField } from '../TextField';

import { PasswordFieldProps } from './types';
import { getThemedStyles } from './styles';
import { authenticatorTextUtil } from '@aws-amplify/ui';

const { getHidePasswordText, getShowPasswordText } = authenticatorTextUtil;

export default function PasswordField({
  disabled,
  iconAccessibilityLabel,
  iconStyle,
  secureTextEntry = true,
  showPasswordButton = true,
  style,
  ...rest
}: PasswordFieldProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const [obscureText, setObscureText] = useState(secureTextEntry);

  const handleOnPress = React.useCallback(() => {
    setObscureText(!obscureText);
  }, [obscureText]);

  const toggleVisibilityAccessibilityLabel =
    iconAccessibilityLabel ?? obscureText
      ? getShowPasswordText()
      : getHidePasswordText();

  return (
    <TextField
      {...rest}
      disabled={disabled}
      secureTextEntry={obscureText}
      style={[themedStyle.container, style]}
      endAccessory={
        showPasswordButton ? (
          <IconButton
            accessibilityLabel={toggleVisibilityAccessibilityLabel}
            disabled={disabled}
            iconStyle={[themedStyle.icon, iconStyle]}
            size={16}
            source={obscureText ? icons.visibilityOff : icons.visibilityOn}
            onPress={handleOnPress}
          />
        ) : null
      }
    />
  );
}
