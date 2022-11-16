import { StyleSheet, ViewStyle } from 'react-native';

export interface ConfirmSignInStyle {
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
}

export const styles: ConfirmSignInStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  buttonSecondary: {
    marginVertical: 8,
  },
});
