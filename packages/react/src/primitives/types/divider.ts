import { Sizes } from './base';
import { ViewProps } from './view';

export type DividerOrientations = 'horizontal' | 'vertical';
export type DividerSizes = Sizes;

export interface DividerOptions {
  /**
   * Controls whether the divider is oriented horizontally or vertically.
   * @default "horizontal"
   */
  orientation?: DividerOrientations;

  /**
   * Size of the divider (height for a horizontal divider, width for vertical)
   * @default "small"
   */
  size?: DividerSizes;

  /**
   * Adds text to the divider, usually something like "or" to separate 2 things.
   */
  label?: string;
}

export interface DividerProps extends ViewProps, DividerOptions {}
