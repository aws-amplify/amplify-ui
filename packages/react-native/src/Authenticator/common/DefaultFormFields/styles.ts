import { StyleSheet } from 'react-native';

import { DefaultFormFieldStyle } from './types';

export const styles: DefaultFormFieldStyle = StyleSheet.create({
  field: {
    fontSize: 16,
    marginVertical: 4,
  },
  error: {
    color: 'red',
  },
});
