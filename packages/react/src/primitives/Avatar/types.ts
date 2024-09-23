import { Sizes } from '../types/base';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';

type AvatarVariations = 'default' | 'filled' | 'outlined';
type AvatarColorThemes = 'info' | 'error' | 'warning' | 'success';
type AvatarSizes = Sizes;

export interface BaseAvatarProps extends BaseViewProps {
  /**
   * @description
   * If you provide a src it will be used as the avatar image
   */
  src?: string;

  /**
   * @description
   * The alt text for the avatar image
   */
  alt?: string;

  /**
   * @description
   * The variation property will affect how the avatar looks, whether
   * it is outlined, filled, or the default style.
   */
  variation?: AvatarVariations;

  /**
   * @description
   * The colorTheme property will affect the color of the avatar. Depending
   * on the variation the colorTheme will change background, border, and text colors
   */
  colorTheme?: AvatarColorThemes;

  /**
   * @description
   * The size property will affect the size of the avatar.
   */
  size?: AvatarSizes;

  /**
   * @description
   * The isLoading property will display a loader around the avatar
   */
  isLoading?: boolean;
}

export type AvatarProps<Element extends ElementType = 'span'> = PrimitiveProps<
  BaseAvatarProps,
  Element
>;
