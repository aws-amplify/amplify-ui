import { StyleSheet } from 'react-native';

import type { StrictTheme } from '../../../theme';
import type { FederatedProviderButtonStyle } from './types';

export const getThemedStyles = (
  theme: StrictTheme
): FederatedProviderButtonStyle => {
  const { space } = theme.tokens;

  return StyleSheet.create({
    button: {
      marginVertical: space.xs,
    },
    dividerLabel: {
      textAlign: 'center',
    },
    container: {
      marginHorizontal: space.small,
    },
  });
};
