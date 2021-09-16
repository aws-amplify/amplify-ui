import { TextFieldProps, TextFieldType } from './textField';

export interface PhoneNumberFieldProps extends TextFieldProps {
  defaultCountryCode: string;
}
