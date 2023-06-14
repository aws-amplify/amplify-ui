import { Sizes } from './base';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type PlaceholderSizes = Sizes;

export interface BasePlaceholderProps extends BaseViewProps {
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
}

export type PlaceholderProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BasePlaceholderProps, Element>;
