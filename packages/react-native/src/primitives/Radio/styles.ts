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
      borderWidth: space.xxs,
      justifyContent: 'center',
      ...components?.radio.radioContainer,
    },
    radioDot: {
      backgroundColor: colors.teal[80],
      borderRadius: ROUNDED_BORDER_RADIUS,
      ...components?.radio.radioDot,
    },
    radioContainerLarge: {
      height: space.xxl,
      width: space.xxl,
      ...components?.radio.radioContainerLarge,
    },
    radioContainerMedium: {
      height: space.xl,
      width: space.xl,
      ...components?.radio.radioContainerMedium,
    },
    radioContainerSmall: {
      height: space.large,
      width: space.large,
      ...components?.radio.radioContainerSmall,
    },
    radioDotLarge: {
      height: space.xxl * RADIO_DOT_PROPORTION,
      width: space.xxl * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotLarge,
    },
    radioDotMedium: {
      height: space.xl * RADIO_DOT_PROPORTION,
      width: space.xl * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotMedium,
    },
    radioDotSmall: {
      height: space.large * RADIO_DOT_PROPORTION,
      width: space.large * RADIO_DOT_PROPORTION,
      ...components?.radio.radioDotSmall,
    },
  });
};
