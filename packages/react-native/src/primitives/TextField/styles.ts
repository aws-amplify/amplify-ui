import { Platform, StyleSheet } from 'react-native';

import { TextFieldStyles } from './types';

export const styles: TextFieldStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: '100%',
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    // this is needed because of extra padding inside the input - in android only
    ...(Platform.OS === 'android' && { padding: 0 }),
  },
  disabled: {
    opacity: 0.6,
  },
});
