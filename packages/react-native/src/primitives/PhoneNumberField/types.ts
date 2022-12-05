import { TextFieldProps, TextFieldStyles } from '../TextField';

export interface PhoneNumberFieldProps
  extends Omit<TextFieldProps, 'secureTextEntry'> {}

export interface PhoneNumberFieldStyles extends Partial<TextFieldStyles> {}
