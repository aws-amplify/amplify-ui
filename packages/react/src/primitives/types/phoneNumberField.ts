import * as React from 'react';

import { SelectFieldProps } from './selectField';
import { TextFieldProps } from './textField';
import { BaseStyleProps } from './style';

export interface PhoneNumberFieldProps extends TextFieldProps {
  countryCodeLabel?: string;
  countryCodeName?: string;
  defaultCountryCode: string;
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;
  type?: 'tel';
  /**
   * Forwarded ref for access to Country Code select DOM element
   */
  countryCodeRef?: React.Ref<HTMLSelectElement>;

  /**
   * Styling that is applied to the select component of the field
   */
  selectStyles?: BaseStyleProps;
}

export interface CountryCodeSelectProps extends SelectFieldProps {
  defaultValue: string;
}
