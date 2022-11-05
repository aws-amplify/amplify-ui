import { PrimitiveProps, TextFieldProps } from '../types';

export const isTextAreaField = (props: {
  isMultiline?: boolean;
}): props is PrimitiveProps<TextFieldProps<true>, 'textarea'> => {
  return props.isMultiline;
};

export const isInputField = (props: {
  isMultiline?: boolean;
}): props is PrimitiveProps<TextFieldProps<false>, 'input'> => {
  return !props.isMultiline;
};

export const isInputRef = (
  props: {
    isMultiline?: boolean;
  },
  ref: React.ForwardedRef<HTMLTextAreaElement | HTMLInputElement>
): ref is React.ForwardedRef<HTMLInputElement> => {
  return !props.isMultiline;
};

export const isTextAreaRef = (
  props: {
    isMultiline?: boolean;
  },
  ref: React.ForwardedRef<HTMLTextAreaElement | HTMLInputElement>
): ref is React.ForwardedRef<HTMLTextAreaElement> => {
  return props.isMultiline;
};
