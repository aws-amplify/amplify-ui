import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { RadioStyles } from './types';

const ROUNDED_BORDER_RADIUS = 999;

export const getThemedStyles = (theme: StrictTheme): RadioStyles => {
  const { colors, opacities } = theme.tokens; // destructure more theme tokens later

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
      backgroundColor: colors.teal[80], // change to teal
      borderRadius: ROUNDED_BORDER_RADIUS,
    },
    radioContainerLarge: {
      height: 24,
      width: 24,
    },
    radioContainerMedium: {
      height: 20,
      width: 20,
    },
    radioContainerSmall: {
      height: 16,
      width: 16,
    },
    radioDotLarge: {
      height: 12,
      width: 12,
    },
    radioDotMedium: {
      height: 10,
      width: 10,
    },
    radioDotSmall: {
      height: 8,
      width: 8,
    },
  });
};
