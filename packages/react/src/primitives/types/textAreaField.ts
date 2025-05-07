import type { BaseTextAreaProps, TextAreaStyleProps } from './textArea';
import type { BaseFieldProps } from './field';
import type { FlexContainerStyleProps } from './flex';
import type { BaseStyleProps } from './style';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseTextAreaFieldProps
  extends BaseFieldProps,
    FlexContainerStyleProps,
    BaseTextAreaProps {
  inputStyles?: BaseStyleProps & TextAreaStyleProps;

  /**
   * @description
   * Automatically adjusts the height of the textarea based on its content
   * @default
   * false
   */
  autoResize?: boolean;
}

export type TextAreaFieldProps<Element extends ElementType = 'textarea'> =
  PrimitiveProps<BaseTextAreaFieldProps, Element>;
