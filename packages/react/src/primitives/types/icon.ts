import { Property } from 'csstype';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';
import { Sizes } from './base';
import * as React from 'react';

export type ViewBox = {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
};

export type IconSize = Sizes;

export interface BaseIconProps extends BaseViewProps {
  /**
   * @description
   * This defines the shape of the <path> SVG element(the 'd' attribute).
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)
   */
  pathData?: string;

  /**
   * @description
   * This is used to define a string that labels the current element.
   */
  ariaLabel?: string;

  /**
   * @description
   * This defines the position and dimension, in user space, of an SVG viewport.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)
   */
  viewBox?: ViewBox;

  /**
   * @description
   * By default this will be "currentColor" to match what is generally expected of icons (they inherit their color from current font color).
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
   */
  fill?: Property.Color;

  /**
   * @description
   * You can pass SVG elements like <path> directly as children for more
   * flexibility and to allow for multiple paths.
   */
  children?: React.ReactNode;

  /**
   * @description
   * Optionally pass an array of path-like objects which
   * the icon will map to <path> elements.
   */
  paths?: React.SVGAttributes<SVGPathElement>[];
}

export type IconProps<Element extends ElementType = 'svg'> = PrimitiveProps<
  BaseIconProps,
  Element
>;
