import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

export interface DividerProps extends ViewProps {
  /*
   * @description
   * Styles for the label
   */
  labelStyle?: StyleProp<TextStyle>;

  /*
   * @description
   * Styles for the line
   */
  lineStyle?: StyleProp<ViewStyle>;
}

export interface DividerStyles {
  container?: ViewStyle;
  label?: TextStyle;
  line?: ViewStyle;
}
