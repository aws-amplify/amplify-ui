import { FlexContainerStyleProps } from './flex';
import { FieldProps } from './field';
import { InputProps } from './input';

export interface RadioGroupFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    InputProps {
  name: string;
  value?: string;
  defaultValue?: string;
}
