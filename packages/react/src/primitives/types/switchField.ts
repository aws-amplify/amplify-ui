import { AriaProps, BaseComponentProps, Sizes } from './base';
import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';

export interface SwitchFieldProps
  extends InputProps,
    FieldProps,
    FlexStyleProps {
  /**
   * If value is provided, this will be a controlled SwitchField
   */
  value?: string;
  /**
   * Use this to provide a default value for an uncontrolled SwitchField
   */
  defaultValue?: string;
}
