import { StyleProp, TextProps, TextStyle } from 'react-native';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends TextProps {
  headingStyle?: StyleProp<TextStyle>;
  level?: HeadingLevel;
  truncated?: boolean;
}

export type HeadingStyles = {
  text: TextStyle;
} & {
  [key in HeadingLevel]: TextStyle;
};
