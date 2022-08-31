import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  PressableProps,
  StyleProp,
} from 'react-native';

export interface IconButtonStyles {
  icon: ImageStyle;
}

export interface IconButtonProps extends PressableProps {
  /**
   * Color to be applied to the icon
   */
  color?: ColorValue;

  /**
   * Icon style properties
   */
  iconStyle?: StyleProp<ImageStyle>;

  /**
   * Icon source, only supports images at this time
   */
  source: ImageSourcePropType;

  /**
   * Icon size
   */
  size?: number;
}
