import { StyleSheet, TextStyle } from 'react-native';

export interface SetupTOTPStyle {
  secretKeyText: TextStyle;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
  secretKeyText: { flexWrap: 'wrap', paddingVertical: 4 },
});
