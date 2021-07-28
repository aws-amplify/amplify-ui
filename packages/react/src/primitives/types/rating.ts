import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import { Property } from 'csstype';

export interface RatingOptions {
  /**
   * The CSS color to use on the empty rating icon
   * Default css value is #A2A2A2
   */
  emptyColor?: Property.Color;

  /**
   * This will override which icon to use as the empty icon
   */
  emptyIcon?: JSX.Element;

  /**
   * The CSS color to use on the filled rating icon
   * Default css value is #ffb400
   */
  fillColor?: Property.Color;

  /**
   * This will override which icon to use
   * Default is <IconStar />
   */
  icon?: JSX.Element;

  /**
   * The max rating
   * Default is 5
   */
  maxValue?: number;

  /**
   *
   * This will set the icon size of the stars
   * Default css value is medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The value of the rating
   * Default is 0
   */
  value?: number;
}

export interface RatingProps
  extends RatingOptions,
    BaseComponentProps,
    BaseStyleProps {}
