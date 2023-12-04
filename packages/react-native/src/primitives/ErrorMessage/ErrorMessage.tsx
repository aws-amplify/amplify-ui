import React from 'react';
import { Text, View } from 'react-native';

import { icons } from '../../assets';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { ErrorMessageProps } from './types';

export const CLOSE_BUTTON_TEST_ID =
  'authenticator--error-message--close-button';

export default function ErrorMessage({
  accessible = true,
  accessibilityRole = 'alert',
  children,
  iconStyle,
  labelStyle,
  onDismiss,
  style,
  ...rest
}: ErrorMessageProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  return (
    <View
      {...rest}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={[themedStyle.container, style]}
    >
      <Icon
        size={20}
        source={icons.error}
        style={[themedStyle.icon, iconStyle]}
      />
      <Text style={[themedStyle.label, labelStyle]}>{children}</Text>
      {onDismiss ? (
        <IconButton
          onPress={onDismiss}
          size={20}
          source={icons.close}
          style={themedStyle.icon}
          testID={CLOSE_BUTTON_TEST_ID}
        />
      ) : null}
    </View>
  );
}
