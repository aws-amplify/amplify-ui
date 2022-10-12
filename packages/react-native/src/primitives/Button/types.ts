import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * @description
   * Styling for Button container
   */
  style?: PressableProps['style'];

  /**
   * @description
   * Styling for label
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}
