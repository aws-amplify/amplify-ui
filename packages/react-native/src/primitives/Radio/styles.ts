import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { RadioStyles } from './types';

const ROUNDED_BORDER_RADIUS = 999;

export const getThemedStyles = (theme: StrictTheme): RadioStyles => {
  const { colors, opacities, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    disabled: {
      opacity: opacities[60],
    },
    radioContainer: {
      alignItems: 'center',
      borderColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
      borderWidth: 2,
      justifyContent: 'center',
    },
    radioDot: {
      backgroundColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
    },
    radioContainerLarge: {
      height: space.xxxl,
      width: space.xxxl,
    },
    radioContainerMedium: {
      height: space.xxl,
      width: space.xxl,
    },
    radioContainerSmall: {
      height: space.xl,
      width: space.xl,
    },
    radioDotLarge: {
      height: space.xl,
      width: space.xl,
    },
    radioDotMedium: {
      height: space.large,
      width: space.large,
    },
    radioDotSmall: {
      height: space.medium,
      width: space.medium,
    },
  });
};
