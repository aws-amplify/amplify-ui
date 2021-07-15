import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export type TextVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface TextProps extends BaseComponentProps, BaseStyleProps {
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
}
