import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type CardVariations = 'outlined' | 'elevated';

/** @deprecated For internal use only */
export interface BaseCardProps extends BaseViewProps {
  /**
   * @description
   * Changes the displayed style of the Card. Options include ‘outlined’, ‘elevated’ and none (default)
   */
  variation?: CardVariations;
}

export type CardProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseCardProps,
  Element
>;
