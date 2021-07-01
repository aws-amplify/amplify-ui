import { Property } from "csstype";
import { AriaProps, BaseComponentProps, StyleProps } from "./base";

export type TextVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "info"
  | "success";

export interface TextProps extends BaseComponentProps, StyleProps, AriaProps {
  /**
   * This should be the primary way to handle different styles of text. Lower-level
   * text styling attributes like color can be set directly, that should be more of an
   * escape hatch.
   */
  variant?: TextVariant;

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
