import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface IconButtonStyles {
  container?: ViewStyle;
  disabled?: ViewStyle;
  pressed?: ViewStyle;
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
