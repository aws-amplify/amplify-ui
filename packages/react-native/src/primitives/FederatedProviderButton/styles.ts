import { StyleSheet } from 'react-native';

import { FederatedProviderButtonStyles } from './types';

export const styles: FederatedProviderButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
  },
  label: {},
  icon: {
    paddingHorizontal: 8,
  },
});
