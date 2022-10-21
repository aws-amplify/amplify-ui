import { StyleSheet } from 'react-native';

import { ResetPasswordStyle } from './types';

const TEAL = '#317d95';

export const styles: ResetPasswordStyle = StyleSheet.create({
  container: {
    width: '90%',
  },
  buttonPrimary: {
    backgroundColor: TEAL,
    borderRadius: 4,
    paddingVertical: 10,
  },
  buttonPrimaryText: {
    color: '#fff',
  },
  buttonSecondary: {
    color: TEAL,
    paddingVertical: 20,
  },
  buttonPressed: { opacity: 0.6 },
  textField: {
    paddingVertical: 16,
  },
});
