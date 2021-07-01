import { AriaProps, BaseComponentProps } from "./base";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonTypes = "button" | "reset" | "submit";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";

export interface ButtonProps extends BaseComponentProps, AriaProps {
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
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Changes the size of the button.
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Changes the button type
   * @default "button"
   */
  type?: ButtonTypes;

  /**
   * Changes the visual weight of the button.
   * @default "secondary"
   */
  variant?: ButtonVariant;

}
