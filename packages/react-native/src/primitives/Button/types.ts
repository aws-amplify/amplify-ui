import { PressableProps, StyleProp, StyleSheet, TextStyle } from 'react-native';

export interface ButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
  themedStyle: StyleSheet.NamedStyles<ButtonStyles>;
}

export interface ButtonStyles {
  text: TextStyle;
}
