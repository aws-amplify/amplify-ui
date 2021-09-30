import { Property } from 'csstype';
import { ViewProps } from './view';

type ScrollViewOrientation =
  | 'vertical'
  | 'horizontal'
  | 'block'
  | 'inline'
  | 'both';

export interface ScrollViewProps extends ViewProps {
  orientation?: ScrollViewOrientation;
}
