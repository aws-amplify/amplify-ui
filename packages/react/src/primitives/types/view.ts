import { AriaProps, BaseComponentProps, StyleProps } from "./base";
import { Property } from 'csstype';

export type ViewAsHTMLElementTypes = keyof JSX.IntrinsicElements;

export interface ViewProps extends BaseComponentProps, StyleProps, AriaProps {
  as?: ViewAsHTMLElementTypes;

  role?: string;

  isDisabled?: boolean;

  /**
   * Intrinsic element width. Must be an integer without a unit.
   */
  htmlWidth?: string | number;

  /**
   * Intrinsic element width. Must be an integer without a unit.
   */
  htmlHeight?: string | number;
}
