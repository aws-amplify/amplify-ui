import { Sizes } from './base';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type BadgeVariations = 'info' | 'error' | 'warning' | 'success';
export type BadgeSizes = Sizes;

export interface BaseBadgeProps extends BaseViewProps {
  /**
   * @description
   * The variation property will affect the background color of the badge.
   */
  variation?: BadgeVariations;
  /**
   * @description
   * The size property will affect the font size of the badge.
   */
  size?: BadgeSizes;
}

export type BadgeProps<Element extends ElementType = 'span'> = PrimitiveProps<
  BaseBadgeProps,
  Element
>;
