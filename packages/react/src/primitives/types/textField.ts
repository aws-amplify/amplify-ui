import { AriaProps, BaseComponentProps, Sizes } from './base';
import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface TextFieldProps extends InputProps, FieldProps, FlexStyleProps {
  type?: TextFieldType;
  /**
   * If value is provided, this will be a controlled TextField
   */
  value?: string;
  /**
   * Use this to provide a default value for an uncontrolled TextField
   */
  defaultValue?: string;
}
