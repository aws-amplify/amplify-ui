import { TextAreaProps } from '.';
import { FieldProps } from './field';
import { FlexContainerStyleProps } from './flex';

export interface TextAreaFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    TextAreaProps {}
