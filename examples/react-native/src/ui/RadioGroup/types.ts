import { RadioProps } from '../Radio';

export interface RadioGroupProps<T>
  extends Omit<RadioProps<T>, 'buttonStyle' | 'iconStyle' | 'selected'> {
  defaultValue?: T;
}
