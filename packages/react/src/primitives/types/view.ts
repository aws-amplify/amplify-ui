import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export type ViewAsHTMLElementTypes = keyof JSX.IntrinsicElements;

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
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
