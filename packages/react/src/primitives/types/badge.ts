import { Sizes } from './base';
import { ViewProps } from './view';

export type BadgeVariations = 'info' | 'error' | 'warning' | 'success';
export type BadgeSizes = Sizes;

export interface BadgeProps extends ViewProps {
  /**
   * The variation property will affect the background color of the badge.
   */
  variation?: BadgeVariations;
  /**
   * The size property will affect the font size of the badge.
   */
  size?: BadgeSizes;
}
