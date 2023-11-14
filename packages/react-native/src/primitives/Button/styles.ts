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
      justifyContent: 'center',
      flexDirection: 'row',
      gap: space.small,
      backgroundColor: colors.transparent,
      paddingVertical: space.small,
      paddingHorizontal: space.medium,
      borderRadius: radii.small,
      ...components?.button?.container,
    },
    containerDefault: {
      borderWidth: borderWidths.small,
      borderColor: colors.border.primary,
      ...components?.button?.containerDefault,
    },
    containerPrimary: {
      backgroundColor: colors.primary[80],
      ...components?.button?.containerPrimary,
    },
    containerLink: {
      ...components?.button?.containerLink,
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
      ...components?.button?.text,
    },
    textPrimary: {
      color: colors.font.inverse,
      ...components?.button?.textPrimary,
    },
    textLink: {
      color: colors.font.interactive,
      ...components?.button?.textLink,
    },
  });
};
