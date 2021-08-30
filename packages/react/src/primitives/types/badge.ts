import { BaseComponentProps } from './base';

import { BaseStyleProps } from './style';

export type BadgeVariation = 'info' | 'error' | 'warning' | 'success';
export type BadgeSize = 'small' | 'large';

export interface BadgeProps extends BaseComponentProps, BaseStyleProps {
  /**
   * The variation property will affect the background color of the badge.
   */
  variation?: BadgeVariation;
  /**
   * The size property will affect the font size of the badge.
   */
  size?: BadgeSize;
}
