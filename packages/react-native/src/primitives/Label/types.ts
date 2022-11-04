import { TextProps, TextStyle } from 'react-native';

export interface LabelProps extends TextProps {
  /**
   * @description
   * The variation property will affect the color of the Label.
   */
  variation?: LabelVariation;
}

export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';

export type LabelVariation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type FontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export interface LabelStyles {
  text: TextStyle;
  primary: TextStyle;
  secondary: TextStyle;
  tertiary: TextStyle;
  error: TextStyle;
  warning: TextStyle;
  success: TextStyle;
  info: TextStyle;
}
