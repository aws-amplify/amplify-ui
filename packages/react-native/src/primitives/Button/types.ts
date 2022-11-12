import { PressableProps, StyleProp, TextStyle } from 'react-native';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
}

export interface ButtonStyles {
  text: TextStyle;
}
