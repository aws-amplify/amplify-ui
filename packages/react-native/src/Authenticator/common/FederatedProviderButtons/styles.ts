import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../../theme';
import { FederatedProviderButtonStyle } from './types';

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
