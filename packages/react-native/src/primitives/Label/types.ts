import { TextProps, TextStyle } from 'react-native';

export interface LabelProps extends Omit<TextProps, 'accessibilityRole'> {}

export interface LabelStyles {
  label: TextStyle;
}
