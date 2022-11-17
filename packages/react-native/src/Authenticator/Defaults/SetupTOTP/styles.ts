import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface SetupTOTPStyle {
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  secretKeyContainer: ViewStyle;
  secretKeyText: TextStyle;
  copyIcon: StyleProp<ImageStyle>;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  buttonSecondary: {
    marginVertical: 8,
  },
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
