import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';
import { Property } from 'csstype';
export interface ViewBox {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
}
export declare type IconSize = 'small' | 'medium' | 'large';
export interface IconProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * This defines the shape of the <path> SVG element(the 'd' attribute).
   * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
   */
  pathData: string;
  /**
   * This is used to define a string that labels the current element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
   */
  ariaLabel: string;
  /**
   * This defines the position and dimension, in user space, of an SVG viewport.
   * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
   */
  viewBox?: ViewBox;
  /**
   * By default this will be "currentColor" to match what is generally expected
   * of icons (they inherit their color from current font color).
   * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill
   */
  fill?: Property.Color;
  /**
   * This is used to change the icon size. Available options are "large", "medium", and "small".
   */
  size?: IconSize;
}
