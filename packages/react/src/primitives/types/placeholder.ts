import { Property } from 'csstype';
import { Sizes } from './base';
import { ViewProps } from './view';

import type { ColorKeys } from './theme';

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

  /**
   * @description
   * Controls the start color of placeholder
   */
  startColor?: ColorKeys<Property.BackgroundColor>;

  /**
   * @description
   * Controls the end color of placeholder
   */
  endColor?: ColorKeys<Property.BackgroundColor>;
}
