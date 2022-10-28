import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface SetupTOTPStyle {
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondary: ViewStyle;
  buttonSecondaryLabel: TextStyle;
  secretKeyContainer: ViewStyle;
  secretKeyText: TextStyle;
  copyIcon: StyleProp<ImageStyle>;
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  secretKeyText: { flex: 1, flexWrap: 'wrap' },
  copyIcon: {
    marginLeft: 12,
  },
});
