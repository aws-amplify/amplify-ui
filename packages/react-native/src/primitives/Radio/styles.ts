import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.6,
  },

  radioButtonContainer: {
    alignItems: 'center',
    borderColor: '#838c95',
    borderRadius: 999,
    justifyContent: 'center',
  },

  radioButton: {
    backgroundColor: '#317d95',
    borderRadius: 999,
  },

  // radioButtonContainer sizes
  large: {
    borderWidth: 4,
    height: 40,
    width: 40,
  },

  medium: {
    borderWidth: 3,
    height: 30,
    width: 30,
  },

  small: {
    borderWidth: 2,
    height: 20,
    width: 20,
  },
});
