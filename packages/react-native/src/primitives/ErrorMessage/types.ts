import { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';

export interface ErrorMessageProps extends TextProps {
  onDismiss?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

export interface ErrorMessageStyles {
  container: ViewStyle;
  iconContainer: ViewStyle;
  text: TextStyle;
  textContainer: ViewStyle;
}
