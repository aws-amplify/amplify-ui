import * as React from 'react';

import { SelectFieldProps } from './selectField';
import { TextInputFieldProps } from './textField';

export interface PhoneNumberFieldProps extends TextInputFieldProps {
  /**
   * Sets a hidden and accessible label for the country or region code selector
   */
  countryCodeLabel?: string;

  /**
   * Sets the name used when handling form submission for the country or region code selector
   */
  countryCodeName?: string;

  /**
   * Sets the default country or region code that will be selected on initial render
   */
  defaultCountryCode: string;

  /**
   * Accepts an array of dial codes (strings) used as options in the country or region code selector
   */
  dialCodeList?: Array<string>;

  /**
   * Handles change events for the country or region code selector
   */
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * <input> elements of type 'tel' are used to let the user enter and edit a telephone number
   */
  type?: 'tel';

  /**
   * Forwarded ref for access to Country Code select DOM element
   */
  countryCodeRef?: React.Ref<HTMLSelectElement>;
}

export interface CountryCodeSelectProps extends SelectFieldProps {
  defaultValue: string;
  dialCodeList?: Array<string>;
  isReadOnly?: boolean;
}
