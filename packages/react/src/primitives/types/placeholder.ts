import type { Property } from 'csstype';

import type { Sizes } from './base';
import type { StyleToken } from './style';
import type { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type PlaceholderSizes = Sizes;

/** @deprecated For internal use only */
export interface BasePlaceholderProps extends BaseViewProps {
  /**
   * @description
   * This property will change the animation end color of the placeholder component
   */
  endColor?: StyleToken<Property.Color>;

  /**
   * @description
   * If true, the placeholder won't show, if false the placeholder will show.
   * @default
   * false
   */
  isLoaded?: boolean;

  /**
   * @description
   * Controls the display size of placeholder
   */
  size?: PlaceholderSizes;

  /**
   * @description
   * This property will change the animation start color of the placeholder component
   */
  startColor?: StyleToken<Property.Color>;
}

export type PlaceholderProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BasePlaceholderProps, Element>;
