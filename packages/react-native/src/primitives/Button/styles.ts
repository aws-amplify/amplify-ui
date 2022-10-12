import { StyleSheet } from 'react-native';

import { ReactNativeTheme } from '../../theme';
import { ButtonStyles } from './types';

export const baseStyles: ButtonStyles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 4, padding: 8 },
  text: { alignSelf: 'center' },
});

export const getThemedStyles = (theme: ReactNativeTheme): ButtonStyles => {
  const buttonToken = theme.tokens.components.button;
  return StyleSheet.create({
    container: {
      borderColor:
        buttonToken.container.borderColor ??
        theme.tokens.colors.brand?.primary[100].value, //TODO: nullish coalescing needed [for now] otherwise color tokens is the only way to change bordercolor and overrides passed in theme
    },
    text: {
      color:
        buttonToken.text.color ?? theme.tokens.colors.brand?.primary[100].value,
    },
  });
};
