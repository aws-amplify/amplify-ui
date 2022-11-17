import { TextAreaProps, TextAreaStyleProps } from './textArea';
import { FieldProps } from './field';
import { FlexContainerStyleProps } from './flex';
import { BaseStyleProps } from './style';

export interface TextAreaFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    TextAreaProps {
  inputStyles?: BaseStyleProps & TextAreaStyleProps;
}
