import { StyleSheet } from 'react-native';

import { TextFieldStyles } from './types';

export const styles: TextFieldStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
