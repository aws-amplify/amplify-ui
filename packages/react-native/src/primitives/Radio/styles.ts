import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  inner: {
    backgroundColor: '#317d95',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  outer: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#838c95',
  },
  // focused: {
  //   borderWidth: 30,
  //   borderColor: '#15404d',
  //   outlineColor: 'red',
  //   outlineWidth: 4,
  // },
});
