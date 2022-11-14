import { StyleSheet, TextStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { ButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ButtonStyles => {
  const { colors, components, fontWeights, opacities, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      paddingHorizontal: space.large,
      paddingVertical: space.small,
      ...components?.button.container,
    },
    containerPrimary: {
      backgroundColor: colors.brand.primary[80],
      borderRadius: space.xs,
      ...components?.button.containerPrimary,
    },
    containerSecondary: {
      backgroundColor: colors.white, // change this
      ...components?.button.containerSecondary,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.button.disabled,
    },
    pressed: { opacity: opacities[60], ...components?.button.pressed },
    text: { fontWeight: fontWeights.bold as TextStyle['fontWeight'] },
    textPrimary: {
      color: colors.white,
      ...components?.button.textPrimary,
    },
    textSecondary: {
      color: colors.teal[80], // change this
      ...components?.button.textSecondary,
    },
  });
};
