import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { ButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ButtonStyles => {
  const { tokens, components } = theme;
  const {
    colors,
    fontSizes,
    fontWeights,
    opacities,
    space,
    radii,
    borderWidths,
  } = tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.transparent,
      justifyContent: 'center',
      paddingVertical: space.small,
      paddingHorizontal: space.medium,
      borderRadius: radii.small,
      borderWidth: borderWidths.small,
      borderColor: colors.border.primary,
      ...components?.button?.container,
    },
    containerPrimary: {
      backgroundColor: colors.brand.primary[80],
      borderWidth: 0,
      ...components?.button?.containerPrimary,
    },
    containerLink: {
      borderWidth: 0,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.button?.disabled,
    },
    pressed: {
      opacity: opacities[60],
      ...components?.button?.pressed,
    },
    text: {
      textAlign: 'center',
      color: colors.font.primary,
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.bold,
    },
    textPrimary: {
      color: colors.font.inverse,
      ...components?.button?.textPrimary,
    },
    textLink: {
      color: colors.font.interactive,
    },
  });
};
