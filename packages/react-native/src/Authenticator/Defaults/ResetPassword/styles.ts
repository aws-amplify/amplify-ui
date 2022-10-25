import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ResetPasswordStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondaryLabel: TextStyle;
  errorMessage: ViewStyle;
}

const TEAL = '#317d95';

export const styles: ResetPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
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
