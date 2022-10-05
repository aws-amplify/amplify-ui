import {
  ImageStyle,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ErrorMessageProps extends TextProps {
  labelStyle?: StyleProp<TextStyle>;
  onDismiss?: () => void;
}

export interface ErrorMessageStyles {
  container: ViewStyle;
  icon: StyleProp<ImageStyle>;
  label: TextStyle;
}
