import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { LabelPosition } from '../Label/types';

export type Size = number | 'small' | 'medium' | 'large';

export interface RadioProps<T> extends PressableProps {
  disabled?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value: T) => void;
  radioContainerStyle?: StyleProp<ViewStyle>;
  radioDotStyle?: StyleProp<ViewStyle>;
  size?: Size;
  selected?: boolean;
  value: T;
}

export type RadioDimensions = Pick<ViewStyle, 'height' | 'width'>;

export interface RadioStyles {
  container?: ViewStyle;
  disabled?: ViewStyle;
  pressed?: ViewStyle;
  radioContainer?: ViewStyle;
  radioContainerLarge?: RadioDimensions;
  radioContainerMedium?: RadioDimensions;
  radioContainerSmall?: RadioDimensions;
  radioDot?: ViewStyle;
  radioDotLarge?: RadioDimensions;
  radioDotMedium?: RadioDimensions;
  radioDotSmall?: RadioDimensions;
}
