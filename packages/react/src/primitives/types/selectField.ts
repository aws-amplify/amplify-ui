import { FlexContainerStyleProps } from './flex';
import { SelectProps } from './select';
import { FieldProps } from './field';

export interface SelectFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    SelectProps {
  /**
   * Accepts an array of strings which maps to the value, label and children of each option tag in the SelectField
   */
  options?: string[];
}
