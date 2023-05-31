import { ElementType, PrimitiveProps, BaseViewProps } from './view';

type ScrollViewOrientation = 'horizontal' | 'vertical';

export interface BaseScrollViewProps extends BaseViewProps {
  /**
   * @deprecated This prop has been deprecated. To get horizontal or vertical scrollbars,
   * make the width or height of the ScrollView component smaller than the content.
   */
  orientation?: ScrollViewOrientation;
}

export type ScrollViewProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseScrollViewProps, Element>;
