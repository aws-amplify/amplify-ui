import { ImageStyle, StyleProp, TextStyle, ViewProps } from 'react-native';

import { IconButtonProps } from '..';

export interface RadioProps<T> extends ViewProps {
  buttonStyle?: IconButtonProps['style'];
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  label?: string;
  labelPosition?: 'start' | 'end' | 'top' | 'bottom';
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  size?: number;
  selected?: boolean;
  value: T;
}
