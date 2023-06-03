import { BaseTextProps } from './text';
import { ElementType, PrimitiveProps } from './view';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface BaseHeadingProps extends BaseTextProps {
  /**
   * @description
   * Controls which semantic section heading element is rendered, <h1> through <h6>
   */
  level?: HeadingLevel;
}

export type HeadingProps<Element extends ElementType = HeadingTag> =
  PrimitiveProps<BaseHeadingProps, Element>;
