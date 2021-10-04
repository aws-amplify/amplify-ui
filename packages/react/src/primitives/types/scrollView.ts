import { ViewProps } from './view';

type ScrollViewOrientation = 'horizontal' | 'vertical';

export interface ScrollViewProps extends ViewProps {
  orientation?: ScrollViewOrientation;
}
