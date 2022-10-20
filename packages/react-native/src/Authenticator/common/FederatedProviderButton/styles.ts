import { StyleSheet } from 'react-native';

import { FederatedProviderButtonStyles } from './types';

export const styles: FederatedProviderButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  icon: {
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: '400',
  },
});
