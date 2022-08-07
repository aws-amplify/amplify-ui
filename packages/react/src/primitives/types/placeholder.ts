import { Sizes } from './base';
import { ViewProps } from './view';

export type PlaceholderSizes = Sizes;

export interface PlaceholderProps extends ViewProps {
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
