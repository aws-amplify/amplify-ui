import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  radioButtonContainer: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#838c95',
  },

  radioButton: {
    borderRadius: 999,
    backgroundColor: '#317d95',
  },

  // sizes for outer container
  large: {
    height: 40,
    width: 40,
    // borderRadius: 20,
    borderWidth: 4,
    // padding: 8,
  },

  medium: {
    height: 30,
    width: 30,
    // borderRadius: 15,
    borderWidth: 3,
    // padding: 4,
  },

  small: {
    height: 20,
    width: 20,
    // borderRadius: 10,
    borderWidth: 2,
    // padding: 4,
  },

  // remove underscore
  _disabled: {
    opacity: 0.6,
  },
});
