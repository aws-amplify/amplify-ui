import { TextAreaProps } from './textArea';
import { FieldProps } from './field';
import { FlexContainerStyleProps } from './flex';

export interface TextAreaFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    TextAreaProps {}
