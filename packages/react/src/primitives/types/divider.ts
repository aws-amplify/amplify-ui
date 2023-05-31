import { Sizes } from './base';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type DividerOrientations = 'horizontal' | 'vertical';
export type DividerSizes = Sizes;

export interface DividerOptions {
  /**
   * @description
   * Controls whether the divider is oriented horizontally or vertically.
   * @default
   * "horizontal"
   */
  orientation?: DividerOrientations;

  /**
   * @description
   * Size of the divider (height for a horizontal divider, width for vertical)
   * @default
   * "small"
   */
  size?: DividerSizes;

  /**
   * @description
   * Adds text to the divider, usually something like "or" to separate 2 things.
   */
  label?: string;
}

export interface BaseDividerProps extends BaseViewProps, DividerOptions {}

export type DividerProps<Element extends ElementType = 'hr'> = PrimitiveProps<
  BaseDividerProps,
  Element
>;
