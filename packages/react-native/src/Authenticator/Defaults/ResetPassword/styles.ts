import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ResetPasswordStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryText: TextStyle;
  buttonSecondary: TextStyle;
  buttonPressed: ViewStyle;
  errorMessage: ViewStyle;
  textField: ViewStyle;
}

const TEAL = '#317d95';

export const styles: ResetPasswordStyle = StyleSheet.create({
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
  textField: {
    paddingVertical: 16,
  },
});
