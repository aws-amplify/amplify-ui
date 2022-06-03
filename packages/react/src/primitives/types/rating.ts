import { Property } from 'csstype';

import { FlexProps } from './flex';
import { Sizes } from './base';
import { StyleToken } from './style';

export type RatingSizes = Sizes;

export interface RatingOptions {
  /**
   * The CSS color to use on the empty rating icon
   * Default css value is #A2A2A2
   */
  emptyColor?: StyleToken<Property.Color>;

  /**
   * This will override which icon to use as the empty icon. This will only
   * override the empty icon an will create a rating component that uses
   * different icons for filled and empty icons.
   */
  emptyIcon?: JSX.Element;

  /**
   * The CSS color to use on the filled rating icon
   * Default css value is #ffb400
   */
  fillColor?: StyleToken<Property.Color>;

  /**
   * This will override which icon to use. This will override both
   * the filled and empty icon values unless an empty icon is specified
   * with the emptyIcon prop
   * Default is <IconStar />
   */
  icon?: JSX.Element;

  /**
   * The max rating integer value
   * Default is 5
   */
  maxValue?: number;

  /**
   *
   * This will set the icon size of the stars
   * Default css value is medium
   */
  size?: RatingSizes;

  /**
   * The value of the rating
   * Default is 0
   */
  value?: number;
}

export interface RatingProps extends RatingOptions, FlexProps {}
