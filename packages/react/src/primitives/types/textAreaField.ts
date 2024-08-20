import { BaseTextAreaProps, TextAreaStyleProps } from './textArea';
import { BaseFieldProps } from './field';
import { FlexContainerStyleProps } from './flex';
import { BaseStyleProps } from './style';
import { ElementType, PrimitiveProps } from './view';

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
