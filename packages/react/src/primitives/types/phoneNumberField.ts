import * as React from 'react';

import { SelectFieldProps } from './selectField';
import { TextInputFieldProps } from './textField';

export interface PhoneNumberFieldProps extends TextInputFieldProps {
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   */
  defaultDialCode: string;

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

export interface DialCodeSelectProps extends SelectFieldProps {
  defaultValue: string;
  dialCodeList?: Array<string>;
  isReadOnly?: boolean;
}
