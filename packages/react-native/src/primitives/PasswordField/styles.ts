import { StyleSheet } from 'react-native';

import type { StrictTheme } from '../../theme';
import type { PasswordFieldStyles } from './types';

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
