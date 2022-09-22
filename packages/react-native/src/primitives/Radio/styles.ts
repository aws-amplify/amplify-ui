import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  radio: {
    borderWidth: 2,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#838c95',

    large: {
      height: 40,
      width: 40,
      borderRadius: 40,
    },

    medium: {
      height: 30,
      width: 30,
      borderRadius: 30,
    },

    small: {
      height: 20,
      width: 20,
      borderRadius: 20,
    },
  },

  radioButton: {
    backgroundColor: '#317d95',

    large: {
      height: 20,
      width: 20,
      borderRadius: 10,
    },

    medium: {
      height: 15,
      width: 15,
      borderRadius: 15,
    },

    small: {
      height: 10,
      width: 10,
      borderRadius: 10,
    },
  },

  // sizes for outer container
  large: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },

  medium: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },

  small: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },

  // remove underscore
  _disabled: {
    opacity: 0.6,
  },
});
