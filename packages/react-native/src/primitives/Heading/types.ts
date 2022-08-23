import { TextProps, TextStyle } from 'react-native';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends TextProps {
  children: string;
  headingStyle?: TextStyle;
  level?: Level;
  truncated?: boolean;
}

export type HeadingStyles = {
  text: TextStyle;
} & {
  [key in Level]: TextStyle;
};
