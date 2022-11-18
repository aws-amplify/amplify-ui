import { ColorValue, ImageProps, ImageStyle } from 'react-native';

export type Size = 'xs' | 'small' | 'medium' | 'large' | 'xl';
export type IconSizes = Record<Size, number>;

export interface IconStyles {
  icon?: ImageStyle;
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
  size?: Size | number;
}
