import { CheckboxProps } from './checkbox';
import { FlexStyleProps } from './flex';
import { FieldProps } from './field';

export interface CheckBoxFieldProps
  extends CheckboxProps,
    Omit<FieldProps, 'label'>,
    FlexStyleProps {
  // A Checkbox is labbelled itself
  // label in CheckboxField should be optional
  label?: string;
}
