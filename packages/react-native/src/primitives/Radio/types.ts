import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

// These types should live elsewhere
export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';
export type Sizes = 'small' | 'medium' | 'large';

export const FLEX_DIRECTIONS: Record<
  LabelPosition,
  ViewStyle['flexDirection']
> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

export interface RadioProps<T> extends ViewProps {
  buttonStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  size?: number | Sizes;
  selected?: boolean;
  value: T;
}

export interface RadioSize {
  // borderRadius: number;
  height: number;
  width: number;
  borderWidth?: ViewStyle['borderWidth'];
  padding?: ViewStyle['padding'];
}

interface RadioSizes {
  large: RadioSize;
  medium: RadioSize;
  small: RadioSize;
}

interface DisabledState {
  opacity: ViewStyle['opacity'];
}

export interface RadioStyles extends RadioSizes {
  container: ViewStyle;
  radioButton: ViewStyle;
  radioButtonContainer: ViewStyle;
  _disabled: DisabledState;
}
