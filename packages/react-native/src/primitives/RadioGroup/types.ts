import { RadioProps } from '../Radio';

export type Direction = 'vertical' | 'horizontal';

export interface RadioGroupProps<T>
  extends Omit<RadioProps<T>, 'buttonStyle' | 'iconStyle' | 'selected'> {
  defaultValue?: T;
  direction?: Direction;
}
