import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { PasswordFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): PasswordFieldStyles => {
  const { components } = theme.tokens;

  return StyleSheet.create({
    container: {
      ...components?.passwordfield.container,
    },
    icon: { ...components?.passwordfield.icon },
  });
};
