import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
export declare type DividerOrientation = 'horizontal' | 'vertical';
export declare type DividerSize = 'small' | 'medium' | 'large';
export interface DividerOptions {
  /**
   * Controls whether the divider is oriented horizontally or vertically.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Size of the divider (height for a horiziontal divider, width for vertical)
   * @default "small"
   */
  size?: DividerSize;
}
export interface DividerProps
  extends DividerOptions,
    BaseComponentProps,
    BaseStyleProps {}
