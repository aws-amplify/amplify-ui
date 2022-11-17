import { StyleSheet, TextStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { ButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ButtonStyles => {
  const { tokens, components } = theme;
  const { colors, fontSizes, fontWeights, opacities, space } = tokens;

  return StyleSheet.create({
    container: {
      padding: space.large,
      ...components?.button?.container,
    },
    containerPrimary: {
      backgroundColor: colors.brand.primary[80],
      ...components?.button?.containerPrimary,
    },
    containerSecondary: {
      backgroundColor: colors.background.primary,
      ...components?.button?.containerSecondary,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.button?.disabled,
    },
    pressed: { opacity: opacities[60], ...components?.button?.pressed },
    text: {
      alignSelf: 'center',
    },
    textPrimary: {
      color: colors.white,
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.bold as TextStyle['fontWeight'],
      ...components?.button?.textPrimary,
    },
    textSecondary: {
      color: colors.brand.primary[80],
      fontSize: fontSizes.small,
      ...components?.button?.textSecondary,
    },
  });
};
