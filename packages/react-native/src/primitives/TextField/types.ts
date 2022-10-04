import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { LabelProps } from '../Label/types';

export interface TextFieldProps extends TextInputProps {
  /**
   * @description
   * styling for TextField container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * @description
   * A Boolean attribute indicating that the user cannot interact with the control
   */
  disabled?: boolean;

  /**
   * @description
   * Indicates whether the TextField component has an error
   */
  error?: boolean;

  /**
   * @description
   *  When defined and `error` is true, show error message
   */
  errorMessage?: string;

  /**
   * @description
   *  Styling for error message
   */
  errorMessageStyle?: StyleProp<TextStyle>;

  /**
   * @description
   * Label text for field
   */
  label?: string;

  /**
   * @description
   * Styling for TextField label
   */
  labelStyle?: LabelProps['style'];

  /**
   * @description
   * Indicates whether to mask the text
   */
  password?: boolean;

  /**
   * @description
   * Styling for TextField component
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * @description
   * Determines which keyboard to open: default or phone number.
   */
  type?: Extract<KeyboardTypeOptions, 'default' | 'phone-pad'>;
}

export interface TextFieldStyles {
  container: ViewStyle;
  text: TextStyle;
  disabled: ViewStyle;
}
