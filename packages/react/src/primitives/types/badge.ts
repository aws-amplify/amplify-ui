import { BaseComponentProps } from './base';

import { BaseStyleProps } from './style';

export type BadgeVariant = 'default' | 'info' | 'error' | 'warning' | 'success';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends BaseComponentProps, BaseStyleProps {
  /**
   * The varient property will affect the background color of the badge.
  */
  variant?: BadgeVariant;
  /**
   * The size property will affect the font size of the badge.
   */
  size?: BadgeSize;
}
