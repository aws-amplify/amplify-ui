import type {
  ImageStyle,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { IconProps } from '../Icon/types';
import type { LabelProps } from '../Label';
import type { LabelPosition } from '../Label/types';

export interface CheckboxProps<T> extends PressableProps {
  iconStyle?: IconProps['style'];
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: LabelProps['style'];
  onChange: (value: T) => void;
  selected?: boolean;
  size?: IconProps['size'];
  style?: StyleProp<ViewStyle>;
  value: T;
}

export interface CheckboxStyles {
  container?: ViewStyle;
  disabled?: ViewStyle;
  icon?: ImageStyle;
  label?: TextStyle;
}
