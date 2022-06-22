import { TextProps } from './text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends TextProps {
  /**
   * @description
   * Controls which semantic section heading element is rendered, <h1> through <h6>
   */
  level?: HeadingLevel;
}
