import { TextStyle, ViewStyle } from 'react-native';
import { RadioProps } from '../Radio';

export type Direction = 'vertical' | 'horizontal';

export interface RadioGroupProps<T>
  extends Pick<
    RadioProps<T>,
    | 'accessibilityRole'
    | 'disabled'
    | 'label'
    | 'labelPosition'
    | 'labelStyle'
    | 'onChange'
    | 'size'
    | 'value'
  > {
  children: React.ReactElement<RadioProps<T>>[];
  defaultValue?: T;
  direction?: Direction;
  style?: ViewStyle;
}

export interface RadioGroupStyles {
  label: TextStyle;
}
