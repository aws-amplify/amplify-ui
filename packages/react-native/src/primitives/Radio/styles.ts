import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  inner: {
    backgroundColor: '#7dd6e8',
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  outer: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 20,
    borderColor: '#838c95',
  },
});
