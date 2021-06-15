// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export interface ButtonProps extends BaseComponentProps {
  /**
   * If `true`, the button will be styled in its active state.
   */
  isActive?: boolean;

  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;

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
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth?: boolean;

  /**
   * Button click event handler
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Changes the button type
   */
  type?: ButtonTypes;

  /**
   * Changes the size of the button.
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Changes the visual weight of the button.
   * @default "secondary"
   */
  variant?: ButtonVariant

  /**
   * Aria label for accessibility
   * @default undefined
   */
  ariaLabel?: string;
}

export enum ButtonTypes {
  Button = "button",
  Reset = "reset",
  Submit = "submit",
}

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Link = "link",
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
