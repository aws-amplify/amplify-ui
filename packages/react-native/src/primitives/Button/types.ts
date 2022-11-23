import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'default' | 'link';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
}

export interface ButtonStyles {
  container?: ViewStyle;
  containerPrimary?: ViewStyle;
  containerDefault?: ViewStyle;
  containerLink?: ViewStyle;
  disabled?: ViewStyle;
  pressed?: ViewStyle;
  text?: TextStyle;
  textPrimary?: TextStyle;
  textDefault?: TextStyle;
  textLink?: TextStyle;
}
