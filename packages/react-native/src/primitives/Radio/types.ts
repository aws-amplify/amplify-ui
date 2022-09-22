import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';

export const FLEX_DIRECTIONS: Record<
  LabelPosition,
  ViewStyle['flexDirection']
> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

export interface RadioProps<T> extends Omit<ViewProps, 'accessibilityRole'> {
  buttonStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  size?: 'small' | 'medium' | 'large';
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
