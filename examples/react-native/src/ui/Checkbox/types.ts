import { StyleProp, ViewStyle } from 'react-native';

import { IconButtonProps } from '@aws-amplify/ui-react-native/src/primitives/IconButton';

import { LabelProps } from '../Label';

export interface CheckboxProps<T>
  extends Omit<IconButtonProps, 'source' | 'style'> {
  buttonStyle?: IconButtonProps['style'];
  label?: string;
  labelPosition?: 'start' | 'end' | 'top' | 'bottom';
  labelStyle?: LabelProps['style'];
  onChange: (value: T) => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  value: T;
}

export interface CheckboxStyle {
  container: ViewStyle;
}
