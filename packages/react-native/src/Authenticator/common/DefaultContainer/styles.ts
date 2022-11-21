import { StyleSheet } from 'react-native';

import { ContainerStyles } from './types';

export const defaultContainerstyles: ContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const innerContainerstyles: ContainerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    width: '100%',
  },
});
