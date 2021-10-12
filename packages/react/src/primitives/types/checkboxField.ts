import { CheckboxProps } from './checkbox';
import { FieldProps } from './field';

export interface CheckboxFieldProps
  extends CheckboxProps,
    Omit<FieldProps, 'label'> {}
