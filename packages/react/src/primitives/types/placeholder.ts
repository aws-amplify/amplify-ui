import { BaseComponentProps } from './base';

export type PlaceholderSize = 'small' | 'medium' | 'large';

export interface PlaceholderProps extends BaseComponentProps {
  /**
   * If true, the placeholder won't show, if false the placeholder will show
   */
  isLoaded?: boolean;

  size?: PlaceholderSize;
}
