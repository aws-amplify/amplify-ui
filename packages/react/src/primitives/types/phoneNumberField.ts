import * as React from 'react';

import { SelectFieldProps } from './selectField';
import { TextInputFieldProps } from './textField';

export interface PhoneNumberFieldProps extends TextInputFieldProps {
  countryCodeLabel?: string;
  countryCodeName?: string;
  defaultCountryCode: string;
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;
  type?: 'tel';
  /**
   * Forwarded ref for access to Country Code select DOM element
   */
  countryCodeRef?: React.Ref<HTMLSelectElement>;
}

export interface CountryCodeSelectProps extends SelectFieldProps {
  defaultValue: string;
}
