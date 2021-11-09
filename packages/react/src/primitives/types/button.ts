import { Sizes } from './base';
import { ViewProps } from './view';
import { FlexContainerStyleProps } from './flex';

export type ButtonSizes = Sizes;
export type ButtonTypes = 'button' | 'reset' | 'submit';
export type ButtonVariations = 'primary' | 'link' | 'menu';

export interface ButtonProps extends ViewProps, FlexContainerStyleProps {
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;

  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;

  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;

  /**
   * The label to show in the button when `loading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;

  /**
   * Button click event handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Changes the size of the button.
   * @default "medium"
   */
  size?: ButtonSizes;

  /**
   * Changes the button type
   * @default "button"
   */
  type?: ButtonTypes;

  /**
   * Changes the visual weight of the button.
   */
  variation?: ButtonVariations;
}
