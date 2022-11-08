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

export type RadioContainerDimensions = Pick<
  ViewStyle,
  'borderWidth' | 'height' | 'width'
>;
export type RadioDotDimensions = Pick<ViewStyle, 'height' | 'width'>;

export interface RadioStyles {
  container: ViewStyle;
  disabled: ViewStyle;
  radioContainer: ViewStyle;
  radioContainerLarge: RadioContainerDimensions;
  radioContainerMedium: RadioContainerDimensions;
  radioContainerSmall: RadioContainerDimensions;
  radioDot: ViewStyle;
  radioDotLarge: RadioDotDimensions;
  radioDotMedium: RadioDotDimensions;
  radioDotSmall: RadioDotDimensions;
}
