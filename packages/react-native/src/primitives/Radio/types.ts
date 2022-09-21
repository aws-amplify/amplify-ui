import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { IconButtonProps } from '..';

export interface RadioProps<T> extends ViewProps {
  buttonStyle?: IconButtonProps['style'];
  // direction can be a prop on RadioGroup
  // direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  label?: string;
  labelPosition?: 'start' | 'end' | 'top' | 'bottom';
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  size?: 'small' | 'large';
  selected?: boolean;
  // does value need to be required?
  value?: T;
}

interface RadioSize {
  height: ViewStyle['height'];
  width: ViewStyle['width'];
  borderRadius: ViewStyle['borderRadius'];
}

interface RadioSizes {
  large: RadioSize;
  small: RadioSize;
}

interface DisabledState {
  opacity: ViewStyle['opacity'];
}

export interface RadioStyles {
  inner: ViewStyle & RadioSizes;
  outer: ViewStyle & RadioSizes;
  _disabled: DisabledState;
}
