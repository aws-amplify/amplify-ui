import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { LabelPosition } from '../Label/types';

// This type should live elsewhere
export type Sizes = 'small' | 'medium' | 'large';

export interface RadioProps<T> extends ViewProps {
  disabled?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  radioButtonContainerStyle?: StyleProp<ViewStyle>;
  radioButtonStyle?: StyleProp<ViewStyle>;
  size?: number | Sizes;
  selected?: boolean;
  value: T;
}

export interface RadioSize {
  borderWidth?: number;
  height: number;
  width: number;
}

interface RadioSizes {
  large: RadioSize;
  medium: RadioSize;
  small: RadioSize;
}

export interface RadioStyles extends RadioSizes {
  container: ViewStyle;
  disabled: ViewStyle;
  radioButton: ViewStyle;
  radioButtonContainer: ViewStyle;
}
