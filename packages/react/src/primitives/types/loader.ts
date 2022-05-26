import { Property } from 'csstype';

import { ViewProps } from '../types/view';
import { Sizes } from './base';

export type LoaderSizes = Sizes;

export type LoaderVariations = 'linear';

export interface LoaderProps extends ViewProps {
  /**
   * This will set the size of Loader.
   */
  size?: LoaderSizes;
  /**
   * This will set the variation of Loader. Available options are linear and none(circular).
   */
  variation?: LoaderVariations;
  /**
   * This will set the filled color of Loader.
   */
  filledColor?: Property.Color;
  /**
   * This will set the empty color of Loader.
   */
  emptyColor?: Property.Color;
  /**
   * This will set the percentage of a determinate Loader.
   */
  percentage?: number;
  /**
   * This will mark the Loader as determinate.
   */
  isDeterminate?: boolean;
  /**
   * This will set the visibility of percentage text.
   */
  isPercentageTextHidden?: boolean;
}
