import { FlexContainerStyleProps } from './flex';
import { SelectProps } from './select';
import { FieldProps } from './field';

export interface SelectFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    SelectProps {
  /**
   * List of option values for select dropdown
   */
  options?: string[];
}
