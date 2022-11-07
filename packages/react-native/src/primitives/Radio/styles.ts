import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { RadioStyles } from './types';

const ROUNDED_BORDER_RADIUS = 999;

export const getThemedStyles = (theme: StrictTheme): RadioStyles => {
  const { colors, components, opacities, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      ...components?.radio.container,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.radio.disabled,
    },
    radioContainer: {
      alignItems: 'center',
      borderColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
      borderWidth: 2,
      justifyContent: 'center',
      ...components?.radio.radioContainer,
    },
    radioDot: {
      backgroundColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
      ...components?.radio.radioDot,
    },
    radioContainerLarge: {
      height: space.xxxl,
      width: space.xxxl,
      ...components?.radio.radioContainerLarge,
    },
    radioContainerMedium: {
      height: space.xxl,
      width: space.xxl,
      ...components?.radio.radioContainerMedium,
    },
    radioContainerSmall: {
      height: space.xl,
      width: space.xl,
      ...components?.radio.radioContainerSmall,
    },
    radioDotLarge: {
      height: space.xl,
      width: space.xl,
      ...components?.radio.radioDotLarge,
    },
    radioDotMedium: {
      height: space.large,
      width: space.large,
      ...components?.radio.radioDotMedium,
    },
    radioDotSmall: {
      height: space.medium,
      width: space.medium,
      ...components?.radio.radioDotSmall,
    },
  });
};
