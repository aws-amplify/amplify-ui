import { FlexStyleProps } from './flex';
import { FieldProps } from './field';
import { InputProps } from './input';

export interface RadioGroupProps
  extends FieldProps,
    FlexStyleProps,
    InputProps {
  name: string;
  value?: string;
  defaultValue?: string;
}
