import { TextProps, TextStyle } from 'react-native';

export interface LabelProps extends TextProps {}

export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';
export interface LabelStyles {
  label: TextStyle;
}
