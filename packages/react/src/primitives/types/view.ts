import { BaseComponentProps } from "./base";
import { Property } from 'csstype';

export type ViewAsHTMLElementTypes = keyof JSX.IntrinsicElements;

export interface ViewProps extends BaseComponentProps {
  as?: ViewAsHTMLElementTypes;
  id?: string;
  backgroundColor?: Property.BackgroundColor;
  color?: Property.Color;

  boxShadow?: Property.BoxShadow;

  padding?: Property.Padding;
  border?: Property.Border;
  borderRadius?: Property.BorderRadius;

  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  minHeight?: Property.MinHeight;

  width?: Property.Width;
  maxWidth?: Property.MaxWidth;
  minWidth?: Property.MinWidth;

  // weight or flex-basis prop??

  opacity?: Property.Opacity;

  role?: string;

  ariaLabel?: string;

  isDisabled?: boolean;

  /**
   * Any arbitrary props will be passed to the underlying element.
   */
  [key: string]: any;
}
