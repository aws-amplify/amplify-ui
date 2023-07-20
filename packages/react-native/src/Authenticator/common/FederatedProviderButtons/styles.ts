import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../../theme';
import { FederatedProviderButtonStyle } from './types';

export const getThemedStyles = (
  theme: StrictTheme
): FederatedProviderButtonStyle => {
  const { tokens } = theme;
  const { space } = tokens;

  return StyleSheet.create({
    button: {
      marginVertical: space.xs,
    },
    container: {
      paddingHorizontal: space.small,
      paddingVertical: space.xxs,
    },
    text: {
      paddingVertical: space.xs,
      textAlign: 'center',
    },
  });
};
