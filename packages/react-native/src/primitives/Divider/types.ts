import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

export interface DividerProps extends ViewProps {
  /*
     Styles for the label
  */
  labelStyle?: StyleProp<TextStyle>;

  /*
     Styles for the line
  */
  lineStyle?: StyleProp<ViewStyle>;
}

export interface DividerStyles {
  container: ViewStyle;
  label: TextStyle;
  line: ViewStyle;
}
