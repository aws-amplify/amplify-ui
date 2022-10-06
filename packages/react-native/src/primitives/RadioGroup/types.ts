import { TextStyle, ViewProps } from 'react-native';
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
    >,
    ViewProps {
  children: React.ReactElement<RadioProps<T>>[];
  direction?: Direction;
}

export interface RadioGroupStyles {
  label: TextStyle;
}
