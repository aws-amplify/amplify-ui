import { StyleProp, TextStyle } from 'react-native';

import { TextFieldProps, TextFieldStyles } from '../TextField';

export interface PhoneNumberFieldProps
  extends Omit<TextFieldProps, 'secureTextEntry'> {
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   */
  defaultDialCode?: string;

  /**
   * @description
   * Accepts an array of dial codes (strings) used as options in the dial code selector
   */
  dialCodes: Array<string>;

  /**
   * @description
   * Styles for the input text field
   */
  inputStyle?: TextFieldProps['style'];

  /**
   * @description
   * Handles change events for the dial code selector
   */
  onDialCodeChange?: (value?: string) => void;

  /**
   * @description
   * Styles for the picker
   */
  pickerStyle?: StyleProp<TextStyle>;

  /**
   * @description
   * Styles for the picker item
   */
  pickerItemStyle?: StyleProp<TextStyle>;

  /**
   * @description
   * Whether the picker renders
   */
  showDialCodes?: boolean;
}

export interface PhoneNumberFieldStyles extends Partial<TextFieldStyles> {
  picker: TextStyle;
  pickerItem: TextStyle;
}
