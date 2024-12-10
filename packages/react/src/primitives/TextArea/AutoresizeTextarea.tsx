import * as React from 'react';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { BaseTextAreaProps, TextAreaProps } from '../types/textArea';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { TextArea } from './TextArea';
import { useAutoresizeTextArea } from './useAutoresizeTextarea';
import { useComposeRefsCallback } from '../../hooks/useComposeRefsCallback';

const AutoresizeTextAreaPrimitive: Primitive<TextAreaProps, 'textarea'> = (
  { value, ...rest },
  externalRef
) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  useAutoresizeTextArea(internalRef.current, value);
  const composedRef = useComposeRefsCallback<HTMLTextAreaElement | null>({
    externalRef,
    internalRef,
  });

  return <TextArea {...rest} ref={composedRef} value={value} />;
};

export const AutoresizeTextArea: ForwardRefPrimitive<
  BaseTextAreaProps,
  'textarea'
> = primitiveWithForwardRef(AutoresizeTextAreaPrimitive);

AutoresizeTextArea.displayName = 'AutoresizeTextArea';
