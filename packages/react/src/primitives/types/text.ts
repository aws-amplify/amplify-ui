import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type TextVariation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface BaseTextProps extends BaseViewProps {
  /**
   * @description
   * This should be the primary way to handle different styles of text. Lower-level
   * text styling attributes like color can be set directly, that should be more of an
   * escape hatch.
   */
  variation?: TextVariation;

  /**
   * @description
   * This attribute will be used to indicate if the text component should truncate text
   * that exceeds the width of the text element.  Truncated text will render an ellipsis.
   */
  isTruncated?: boolean;
}

export type TextProps<Element extends ElementType = 'p'> = PrimitiveProps<
  BaseTextProps,
  Element
>;
