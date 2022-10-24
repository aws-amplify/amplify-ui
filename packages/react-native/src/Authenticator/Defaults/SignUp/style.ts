import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// TODO: clean up with theming
interface SignUpStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondary: TextStyle;
  buttonSecondaryLabel: TextStyle;
  errorMessage: ViewStyle;
  textField: ViewStyle;
}

export const styles: SignUpStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
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
});
