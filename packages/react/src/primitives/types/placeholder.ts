import { BaseComponentProps, Sizes } from './base';

export type PlaceholderSizes = Sizes;

export interface PlaceholderProps extends BaseComponentProps {
  /**
   * If true, the placeholder won't show, if false the placeholder will show.
   * @default false
   */
  isLoaded?: boolean;

  /**
   * Controls the display size of placeholder
   */
  size?: PlaceholderSizes;
}
