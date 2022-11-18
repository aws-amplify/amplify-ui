import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
}

export interface ButtonStyles {
  container?: ViewStyle;
  containerPrimary?: ViewStyle;
  containerSecondary?: ViewStyle;
  disabled?: ViewStyle;
  pressed?: ViewStyle;
  text?: TextStyle;
  textPrimary?: TextStyle;
  textSecondary?: TextStyle;
}
