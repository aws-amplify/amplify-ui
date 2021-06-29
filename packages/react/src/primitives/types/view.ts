import { AriaProps, BaseComponentProps, StyleProps } from "./base";
import { Property } from 'csstype';

export type ViewAsHTMLElementTypes = keyof JSX.IntrinsicElements;

export interface ViewProps extends BaseComponentProps, StyleProps, AriaProps {
  as?: ViewAsHTMLElementTypes;

  role?: string;

  isDisabled?: boolean;

  /**
   * Any arbitrary props will be passed to the underlying element.
   */
  [key: string]: any;
}
