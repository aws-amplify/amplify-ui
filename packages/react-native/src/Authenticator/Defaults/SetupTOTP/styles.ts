import { StyleSheet, TextStyle } from 'react-native';

export interface SetupTOTPStyle {
  secretKeyText: TextStyle;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
  // TODO: replace with tokens
  secretKeyText: { flexWrap: 'wrap', paddingVertical: 4, marginHorizontal: 8 },
});
