import { ViewProps } from './view';

type ScrollViewOrientation = 'vertical' | 'horizontal' | 'block' | 'inline';

export interface ScrollViewProps extends ViewProps {
  orientation?: ScrollViewOrientation;
}
