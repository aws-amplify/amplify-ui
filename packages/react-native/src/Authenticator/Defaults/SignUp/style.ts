import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// TODO: clean up with theming
interface SignUpStyle {
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondary: TextStyle;
  buttonSecondaryLabel: TextStyle;
  errorMessage: ViewStyle;
  textField: ViewStyle;
  tabs: ViewStyle;
}

export const styles: SignUpStyle = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: 'teal',
    marginVertical: 8,
    paddingVertical: 12,
  },
  buttonPrimaryLabel: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  buttonSecondary: {
    marginVertical: 8,
    paddingVertical: 12,
  },
  buttonSecondaryLabel: { color: 'teal' },
  errorMessage: {
    marginBottom: 16,
  },
  textField: {
    paddingVertical: 16,
  },
  tabs: { marginBottom: 8 },
});
