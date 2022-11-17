import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface ErrorMessageProps extends ViewProps {
  labelStyle?: StyleProp<TextStyle>;
  onDismiss?: () => void;
}

export interface ErrorMessageStyles {
  container?: ViewStyle;
  icon?: ImageStyle;
  label?: TextStyle;
}
