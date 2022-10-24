import { StyleSheet } from 'react-native';

import { ConfirmResetPasswordStyle } from './types';

const TEAL = '#317d95';

export const styles: ConfirmResetPasswordStyle = StyleSheet.create({
  container: {
    width: '100%',
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
  errorMessage: {
    marginBottom: 16,
  },
  field: {
    paddingBottom: 20,
  },
});
