import { RadioProps } from '@aws-amplify/ui-react-native/dist/primitives';

export interface RadioGroupProps<T>
  extends Omit<RadioProps<T>, 'buttonStyle' | 'iconStyle' | 'selected'> {
  defaultValue?: T;
  direction?: 'vertical' | 'horizontal';
}
