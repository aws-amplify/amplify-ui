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
}
