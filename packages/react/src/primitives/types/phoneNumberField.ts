import { TextFieldProps } from './textField';

export interface PhoneNumberFieldProps extends TextFieldProps {
  countryCodeName?: string;
  defaultCountryCode: string;
  type?: 'tel';
}
