import { FlexStyleProps } from './flex';
import { FieldProps } from './field';
import { InputProps } from './input';

export interface RadioGroupFieldProps
  extends FieldProps,
    FlexStyleProps,
    InputProps {
  name: string;
  value?: string;
  defaultValue?: string;
}
