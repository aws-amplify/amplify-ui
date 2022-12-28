import { TextStyle, ViewProps, ViewStyle } from 'react-native';
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
    >,
    ViewProps {
  children: React.ReactElement<RadioProps<T>>[];
  direction?: Direction;
  initialValue?: T;
  onValueChange?: (value?: T) => void;
}

export interface RadioGroupStyles {
  container?: ViewStyle;
  label?: TextStyle;
}
