import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface RadioProps<T> extends ViewProps {
  buttonStyle?: StyleProp<TextStyle>;
  // direction can be a prop on RadioGroupField
  // direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  label?: string;
  labelPosition?: 'start' | 'end' | 'top' | 'bottom';
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  size?: 'small' | 'large';
  selected?: boolean;
  value: T;
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
  container: ViewStyle;
  radio: ViewStyle & RadioSizes;
  radioButton: ViewStyle & RadioSizes;
  _disabled: DisabledState;
}
