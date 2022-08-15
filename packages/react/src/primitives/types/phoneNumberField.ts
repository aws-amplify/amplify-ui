import * as React from 'react';

import { SelectFieldProps } from './selectField';
import { TextInputFieldProps } from './textField';

interface optionalPhoneNumberFieldProps
  extends TextInputFieldProps,
    CountryCodeFieldProps {
  /**
   * @description
   * Sets a hidden and accessible label for the dial code selector
   */
  dialCodeLabel?: string;

  /**
   * @description
   * Sets the name used when handling form submission for the dial code selector
   */
  dialCodeName?: string;

  /**
   * @description
   * Accepts an array of dial codes (strings) used as options in the dial code selector
   */
  dialCodeList?: Array<string>;

  /**
   * @description
   * Handles change events for the dial code selector
   */
  onDialCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * @description
   * <input> elements of type 'tel' are used to let the user enter and edit a telephone number
   */
  type?: 'tel';

  /**
   * @description
   * Forwarded ref for access to Dial Code select DOM element
   */
  dialCodeRef?: React.Ref<HTMLSelectElement>;
}

interface CountryCodeFieldProps {
  /**
   * @description
   * Sets a hidden and accessible label for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use dialCodeLabel
   */
  countryCodeLabel?: string;

  /**
   * @description
   * Sets the name used when handling form submission for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use dialCodeName
   */
  countryCodeName?: string;

  /**
   * @description
   * Handles change events for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use onDialCodeChange
   */
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * @description
   * Forwarded ref for access to Country Code select DOM element
   * @deprecated
   * To be removed with next major version release, please use dialCodeRef
   */
  countryCodeRef?: React.Ref<HTMLSelectElement>;
}

interface CountryCodeRequired extends optionalPhoneNumberFieldProps {
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   * @deprecated
   * To be removed with next major version release, please use defaultDialCode
   */
  defaultCountryCode: string;

  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   */
  defaultDialCode?: string;
}

interface DialCodeRequired extends optionalPhoneNumberFieldProps {
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   * @deprecated
   * To be removed with next major version release, please use defaultDialCode
   */
  defaultCountryCode?: string;

  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   */
  defaultDialCode: string;
}

export type PhoneNumberFieldProps = CountryCodeRequired | DialCodeRequired;

export interface DialCodeSelectProps extends SelectFieldProps {
  defaultValue: string;
  dialCodeList?: Array<string>;
  isReadOnly?: boolean;
}
