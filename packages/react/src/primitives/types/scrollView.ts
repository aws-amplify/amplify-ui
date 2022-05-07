import { ViewProps } from './view';

type ScrollViewOrientation = 'horizontal' | 'vertical';

export interface ScrollViewProps extends ViewProps {
  /**
   * @deprecated This prop has been deprecated. To get horizontal or vertical scrollbars,
   * make the width or height of the ScrollView component smaller than the content.
   */
  orientation?: ScrollViewOrientation;
}
