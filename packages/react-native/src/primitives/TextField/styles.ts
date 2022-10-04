import { StyleSheet } from 'react-native';

import { TextFieldStyles } from './types';

export const styles: TextFieldStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
});
