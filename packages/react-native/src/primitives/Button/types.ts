import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
}

export interface ButtonStyles {
  button: ViewStyle;
  pressed: ViewStyle;
  text: TextStyle;
}
