import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ConfirmResetPasswordStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondaryLabel: ViewStyle;
  errorMessage: ViewStyle;
}

const TEAL = '#317d95';

export const styles: ConfirmResetPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: TEAL,
    borderRadius: 4,
    paddingVertical: 10,
  },
  buttonPrimaryLabel: {
    color: '#fff',
  },
  buttonSecondaryLabel: {
    color: TEAL,
    paddingVertical: 20,
  },
  errorMessage: {
    marginBottom: 16,
  },
});
