import { Property } from 'csstype';

import { BaseFlexProps } from './flex';
import { Sizes } from './base';
import { StyleToken } from './style';
import { ElementType, PrimitiveProps } from './view';

export type RatingSizes = Sizes;

export interface RatingOptions {
  /**
   * @description
   * The CSS color to use on the empty rating icon
   * Default css value is #A2A2A2
   */
  emptyColor?: StyleToken<Property.Color>;

  /**
   * @description
   * This will override which icon to use as the empty icon. This will only
   * override the empty icon an will create a rating component that uses
   * different icons for filled and empty icons.
   */
  emptyIcon?: JSX.Element;

  /**
   * @description
   * The CSS color to use on the filled rating icon
   * Default css value is #ffb400
   */
  fillColor?: StyleToken<Property.Color>;

  /**
   * @description
   * This will override which icon to use. This will override both
   * the filled and empty icon values unless an empty icon is specified
   * with the emptyIcon prop
   * Default is <IconStar />
   */
  icon?: JSX.Element;

  /**
   * @description
   * The max rating integer value
   * Default is 5
   */
  maxValue?: number;

  /**
   * @description
   *
   * This will set the icon size of the stars
   * Default css value is medium
   */
  size?: RatingSizes;

  /**
   * @description
   * The value of the rating
   * Default is 0
   */
  value?: number;
}

export interface BaseRatingProps extends RatingOptions, BaseFlexProps {}

export type RatingProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseRatingProps,
  Element
>;
