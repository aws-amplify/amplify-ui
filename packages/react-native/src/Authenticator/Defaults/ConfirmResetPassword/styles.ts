import { StyleSheet, ViewStyle } from 'react-native';

export interface ConfirmResetPasswordStyle {
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
}

export const styles: ConfirmResetPasswordStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  buttonSecondary: {
    marginVertical: 8,
  },
});
