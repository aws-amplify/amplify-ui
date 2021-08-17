import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
export declare type BadgeVariation =
  | 'default'
  | 'info'
  | 'error'
  | 'warning'
  | 'success';
export declare type BadgeSize = 'small' | 'medium' | 'large';
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
