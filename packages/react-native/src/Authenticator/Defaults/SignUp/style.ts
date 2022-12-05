import { StyleSheet, ViewStyle } from 'react-native';

// TODO: clean up with theming
interface SignUpStyle {
  buttonPrimary: ViewStyle;
  errorMessage: ViewStyle;
  textField: ViewStyle;
  tabs: ViewStyle;
}

export const styles: SignUpStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  errorMessage: {
    marginBottom: 16,
  },
  textField: {
    paddingVertical: 16,
  },
  tabs: { marginBottom: 8 },
});
