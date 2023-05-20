import { Sizes } from './base';
import { ViewProps } from './view';

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

  /**
   * @description
   * Adds color to the divider.
   */
  borderColor?: string;

  /**
   * @description
   * Adds width to the divider.
   */
  borderWidth?: string;

  /**
   * @description
   * Adds style to the divider (solid, dashed, dotted, etc.).
   */
  borderStyle?: string;
}

export interface DividerProps extends ViewProps, DividerOptions {}
