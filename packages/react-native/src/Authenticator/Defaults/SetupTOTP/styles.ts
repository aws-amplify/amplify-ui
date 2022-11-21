import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface SetupTOTPStyle {
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  secretKeyText: TextStyle;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  buttonSecondary: {
    marginVertical: 8,
  },
  secretKeyText: { flexWrap: 'wrap', paddingVertical: 4 },
});
