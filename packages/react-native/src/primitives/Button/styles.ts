import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { ButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ButtonStyles => {
  const { colors, components, opacities, space } = theme.tokens;

  return StyleSheet.create({
    button: {
      backgroundColor: colors.brand.primary[80],
      borderRadius: space.xs,
      paddingHorizontal: space.large,
      paddingVertical: space.small,
      ...components?.button.button,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.button.disabled,
    },
    pressed: { opacity: opacities[60], ...components?.button.pressed },
    text: {
      color: colors.white,
      // fontWeight too?
      ...components?.button.text,
    },
  });
};
