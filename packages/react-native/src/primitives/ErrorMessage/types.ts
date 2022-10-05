import { TextProps, TextStyle, ViewStyle } from 'react-native';

export interface ErrorMessageProps extends TextProps {}
/*

  text: TextStyle;

  icon?

*/

export interface ErrorMessageStyles {
  container: ViewStyle;
  dismissButtonContainer: TextStyle;
  errorIconContainer: TextStyle;
  text: TextStyle;
  textContainer: TextStyle;
}
