import { BaseTextAreaProps, TextAreaStyleProps } from './textArea';
import { BaseFieldProps } from './field';
import { FlexContainerStyleProps } from './flex';
import { BaseStyleProps } from './style';
import { ElementType, PrimitiveProps } from './view';

export interface BaseTextAreaFieldProps
  extends BaseFieldProps,
    FlexContainerStyleProps,
    BaseTextAreaProps {
  inputStyles?: BaseStyleProps & TextAreaStyleProps;
}

export type TextAreaFieldProps<Element extends ElementType = 'textarea'> =
  PrimitiveProps<BaseTextAreaFieldProps, Element>;
