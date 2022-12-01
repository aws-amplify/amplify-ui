import { Sizes } from './base';
import { FlexContainerStyleProps } from './flex';
import { LinkProps } from './link';
import { ViewProps } from './view';

export type ButtonSizes = Sizes;
export type ButtonTypes = 'button' | 'reset' | 'submit';
export type ButtonVariations = 'primary' | 'link' | 'menu';

export interface ButtonProps
  extends ViewProps,
    Pick<LinkProps, 'href'>,
    FlexContainerStyleProps {
  /**
   * @description
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;

  /**
   * @description
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;

  /**
   * @description
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;

  /**
   * @description
   * The label to show in the button when `loading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;

  /**
   * @description
   * Button click event handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * @description
   * Changes the size of the button.
   * @default
   * "medium"
   */
  size?: ButtonSizes;

  /**
   * @description
   * Changes the button type
   * @default
   * "button"
   */
  type?: ButtonTypes;

  /**
   * @description
   * Changes the visual weight of the button.
   */
  variation?: ButtonVariations;
}
