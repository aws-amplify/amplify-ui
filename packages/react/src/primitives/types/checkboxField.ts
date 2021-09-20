import { CheckboxProps } from './checkbox';
import { FlexStyleProps } from './flex';
import { FieldProps } from './field';

export interface CheckboxFieldProps
  extends CheckboxProps,
    FlexStyleProps,
    Omit<FieldProps, 'label'> {}
