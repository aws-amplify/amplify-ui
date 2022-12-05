import { ImageStyle } from 'react-native';
import { IconButtonProps } from '../IconButton';
import { TextFieldProps, TextFieldStyles } from '../TextField';

export interface PasswordFieldProps extends TextFieldProps {
  /**
   * @description
   * For password fields, will toggle visibility of the "show password" button
   */
  showPasswordButton?: boolean;

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
  icon?: ImageStyle;
}
