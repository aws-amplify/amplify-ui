import { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { IconProps } from '../Icon/types';
import { LabelProps } from '../Label';
import { LabelPosition } from '../Label/types';

export interface CheckboxProps<T> extends PressableProps {
  iconStyle?: IconProps['style'];
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: LabelProps['style'];
  onChange: (value: T) => void;
  selected?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  value: T;
}

export interface CheckboxStyle {
  container: ViewStyle;
}
