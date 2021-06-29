import React from "react";
import { Property } from "csstype";
// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export type ButtonSize = "small" | "medium" | "large";
export type ButtonTypes = "button" | "reset" | "submit";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";

export interface ButtonProps extends BaseComponentProps {
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
   * Changes the button type
   * @default "button"
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
  variant?: ButtonVariant;

  /**
   * Aria label for accessibility
   * @default undefined
   */
  ariaLabel?: string;
}

const ComponentClassNames = {
  AmplifyText: "AmplifyText",
};

export type TextVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "info"
  | "success";

export interface TextProps {
  /**
   * Lower-level text styling attributes
   * These
   */
  fontStyle?: Property.FontStyle;
  textDecoration?: Property.TextDecoration;
  fontWeight?: Property.FontWeight;
  fontFamily?: Property.FontFamily;
  color?: Property.Color;
  letterSpacing?: Property.LetterSpacing;
  lineHeight?: Property.LineHeight;
}

export interface TextOptions extends BaseComponentProps, TextProps {
  /**
   * This should be the primary way to handle different styles of text. Lower-level
   * text styling attributes like color can be set directly, that should be more of an
   * escape hatch.
   */
  variant?: TextVariant;

  /**
   * This will be mapped to aria-label
   */
  ariaLabel?: string;

  /**
   *
   */
  isTruncated?: boolean;

  /**
   * Any arbitrary props will be passed to the underlying element. A user could pass
   * an onClick method if they wanted to or data-* attributes if needed.
   */
  [key: string]: any;
}
