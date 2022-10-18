import { ImageStyle } from 'react-native';
import { IconButtonProps } from '../IconButton';
import { TextFieldProps, TextFieldStyles } from '../TextField';

export interface PasswordFieldProps
  extends Omit<TextFieldProps, 'secureTextEntry'> {
  /**
   * @description
   * For password fields, will hide the "show password" button
   */
  hideShowPassword?: boolean;

  /**
   * @description
   * Styling for the icon
   */
  iconStyle?: IconButtonProps['iconStyle'];

  /**
   * @description
   * Accessibility label for the icon
   */
  iconAccessibilityLabel?: string;
}

export interface PasswordFieldStyles extends Partial<TextFieldStyles> {
  icon: ImageStyle;
}
