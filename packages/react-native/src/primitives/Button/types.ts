import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
}

export interface ButtonStyles {
  pressed: ViewStyle;
  text: TextStyle;
}
