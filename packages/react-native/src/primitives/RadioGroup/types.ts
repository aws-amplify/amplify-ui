import { RadioProps } from '../Radio';

export type Direction = 'vertical' | 'horizontal';

export interface RadioGroupProps<T>
  // pick the Radio props that should also be available on the RadioGroup
  extends Omit<RadioProps<T>, 'buttonStyle' | 'iconStyle' | 'selected'> {
  defaultValue?: T;
  direction?: Direction;
}
