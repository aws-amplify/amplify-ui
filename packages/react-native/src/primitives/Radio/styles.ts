import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { RADIO_DOT_PROPORTION } from './getRadioDimensions';
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
      borderColor: colors.border.primary,
      borderRadius: ROUNDED_BORDER_RADIUS,
      justifyContent: 'center',
      ...components?.radio.radioContainer,
    },
    radioDot: {
      backgroundColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
      ...components?.radio.radioDot,
    },
    radioContainerLarge: {
      borderWidth: 3,
      height: space.xxxl,
      width: space.xxxl,
      ...components?.radio.radioContainerLarge,
    },
    radioContainerMedium: {
      borderWidth: 2,
      height: space.xxl,
      width: space.xxl,
      ...components?.radio.radioContainerMedium,
    },
    radioContainerSmall: {
      borderWidth: 1,
      height: space.xl,
      width: space.xl,
      ...components?.radio.radioContainerSmall,
    },
    radioDotLarge: {
      height: space.xxxl * RADIO_DOT_PROPORTION,
      width: space.xxxl * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotLarge,
    },
    radioDotMedium: {
      height: space.xxl * RADIO_DOT_PROPORTION,
      width: space.xxl * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotMedium,
    },
    radioDotSmall: {
      height: space.xl * RADIO_DOT_PROPORTION,
      width: space.xl * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotSmall,
    },
  });
};
