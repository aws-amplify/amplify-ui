import { StyleSheet } from 'react-native';

import { ReactNativeTheme } from '../../theme';
import { ButtonStyles } from './types';

export const baseStyles: ButtonStyles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 4, padding: 8 },
  text: { alignSelf: 'center' },
  disabled: {
    opacity: 0.8,
  },
});

export const getThemedStyles = (theme: ReactNativeTheme): ButtonStyles => {
  return StyleSheet.create({
    ...theme.tokens.components.button,
  });
};
