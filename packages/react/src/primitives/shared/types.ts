// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export interface ButtonProps extends BaseComponentProps {
  /**
   * If `true`, the button will show a spinner.
   */
  loading?: boolean;

  /**
   * If `true`, the button will be styled in its active state.
   */
  active?: boolean;

  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;

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
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit" | ButtonTypes;

  /**
   * Changes the size of the button.
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | ButtonSize;

  /**
   * Changes the visual weight of the button.
   * @default "secondary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "link" | ButtonVariant

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

export const ChakraButtonSizeMap = {
  [ButtonSize.Small]: "sm",
  [ButtonSize.Medium]: "md",
  [ButtonSize.Large]: "lg",
};
