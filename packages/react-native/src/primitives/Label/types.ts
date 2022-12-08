import { TextProps, TextStyle } from 'react-native';

export interface LabelProps extends TextProps {
  /**
   * @description
   * The variant property will affect the color of the Label.
   */
  variant?: LabelVariant;
}

export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';

export type LabelVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface LabelStyles {
  text?: TextStyle;
  primary?: TextStyle;
  secondary?: TextStyle;
  tertiary?: TextStyle;
  error?: TextStyle;
  warning?: TextStyle;
  success?: TextStyle;
  info?: TextStyle;
}
