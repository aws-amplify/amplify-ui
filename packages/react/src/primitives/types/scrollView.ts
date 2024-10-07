import { ElementType, PrimitiveProps, BaseViewProps } from './view';

type ScrollViewOrientation = 'horizontal' | 'vertical';

/** @deprecated For internal use only */
export interface BaseScrollViewProps extends BaseViewProps {
  /**
   * @deprecated This prop has been deprecated. To get horizontal or vertical scrollbars,
   * make the width or height of the ScrollView component smaller than the content.
   */
  orientation?: ScrollViewOrientation;

  /**
   * @description
   * Scroll to the end as the children of it change
   */
  autoScroll?: 'smooth' | 'instant' | 'auto';
}

export type ScrollViewProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseScrollViewProps, Element>;
