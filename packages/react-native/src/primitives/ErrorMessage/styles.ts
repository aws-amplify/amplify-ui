import { StyleSheet } from 'react-native';

import { ErrorMessageStyles } from './types';

export const styles: ErrorMessageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5bcbc',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 16,
    width: '100%',
  },
  icon: {
    margin: 4,
  },
  label: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
