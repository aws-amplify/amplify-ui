import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { PasswordFieldStyles } from './types';

export const getThemedStyles = ({
  components,
  tokens: { colors },
}: StrictTheme): PasswordFieldStyles => {
  return StyleSheet.create({
    container: {
      ...components?.passwordField?.container,
    },
    icon: {
      // match to `TextField` placeholder color
      tintColor: colors.font.tertiary,
      ...components?.passwordField?.icon,
    },
  });
};
