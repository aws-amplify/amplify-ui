import { Property } from "csstype";
import { AriaProps, BaseComponentProps, StyleProps } from "./base";

export type TextVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "warning"
  | "info"
  | "success";

export interface TextProps extends BaseComponentProps, StyleProps {
  /**
   * This should be the primary way to handle different styles of text. Lower-level
   * text styling attributes like color can be set directly, that should be more of an
   * escape hatch.
   */
  variant?: TextVariant;

  /**
   * This attribute will be used to indicate if the text component should truncate text
   * that exceeds the width of the text element.  Truncated text will render an ellipsis.
   */
  isTruncated?: boolean;

  /**
   * Any arbitrary props will be passed to the underlying element. A user could pass
   * an onClick method if they wanted to or data-* attributes if needed.
   */
  [key: string]: any;
}
