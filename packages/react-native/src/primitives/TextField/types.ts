import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { LabelProps } from '../Label/types';

export interface TextFieldProps extends Omit<TextInputProps, 'editable'> {
  /**
   * @description
   * Styling for TextField container
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
   * Styling for the label
   */
  labelStyle?: LabelProps['style'];

  /**
   * @description
   * Styling for the input
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * @description
   * Component(s) to show after input
   */
  outerEndComponent?: React.ReactNode;
}

export interface TextFieldStyles {
  container: ViewStyle;
  input: TextStyle;
  inputContainer: ViewStyle;
  disabled: ViewStyle;
}
