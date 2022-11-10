import { ColorValue, ImageProps, ImageStyle } from 'react-native';

export type Size = 'xs' | 'small' | 'medium' | 'large' | 'xl';
export type IconSizes = Record<Size, number>;

export const iconSizes: IconSizes = {
  xs: 16,
  small: 20,
  medium: 24,
  large: 32,
  xl: 48,
};

export interface IconStyles {
  icon: ImageStyle;
}

export interface IconProps extends ImageProps {
  /**
   * Whether the icon is animated
   */
  animated?: boolean;

  /**
   * Color to be applied to the icon
   */
  color?: ColorValue;

  /**
   * Icon size
   */
  size?: number;
}
