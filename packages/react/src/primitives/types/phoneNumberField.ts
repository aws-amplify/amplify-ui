import { TextFieldProps } from './textField';

export interface PhoneNumberFieldProps extends TextFieldProps {
  autoComplete?: 'username';
  defaultCountryCode: string;
  type?: 'tel';
}
