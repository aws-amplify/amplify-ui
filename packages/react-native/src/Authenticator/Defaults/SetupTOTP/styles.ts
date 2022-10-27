import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface SetupTOTPStyle {
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondary: ViewStyle;
  buttonSecondaryLabel: TextStyle;
  secretKeyContainer: ViewStyle;
  copyButton: ViewStyle;
  copyButtonLabel: TextStyle;
  // copyIcon: StyleProp<ImageStyle>;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
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
  secretKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    borderColor: 'teal',
    borderWidth: 2,
    padding: 4,
    marginLeft: 12,
  },
  copyButtonLabel: {
    color: 'teal',
  },
  // copyIcon: {
  //   marginLeft: 12,
  // },
});
