import { StyleSheet } from 'react-native';

import { FederatedProviderButtonStyles } from './types';
import { StrictTheme } from '../../../theme';

export const getThemedStyles = (
  theme: StrictTheme
): FederatedProviderButtonStyles => {
  const { radii, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: radii.small,
      borderWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: space.xs,
      width: '100%',
    },
    icon: {
      paddingHorizontal: space.medium,
    },
    label: {
      fontWeight: '400',
    },
  });
};
