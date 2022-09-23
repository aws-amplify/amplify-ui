import { StyleProp, ViewStyle } from 'react-native';

import { IconButtonProps } from '../IconButton';

import { LabelProps } from '../Label';
import { LabelPosition } from '../Label/types';

export interface CheckboxProps<T>
  extends Omit<IconButtonProps, 'source' | 'style'> {
  buttonStyle?: IconButtonProps['style'];
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: LabelProps['style'];
  onChange: (value: T) => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  value: T;
}

export interface CheckboxStyle {
  container: ViewStyle;
}
