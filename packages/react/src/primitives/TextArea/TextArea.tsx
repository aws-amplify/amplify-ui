import * as React from 'react';
import { fieldGroupClasses, textareaClasses } from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types/view';
import { BaseTextAreaProps, TextAreaProps } from '../types/textArea';
import { View } from '../View';
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TextAreaPrimitive: Primitive<TextAreaProps, 'textarea'> = (
  {
    className,
    isDisabled,
    isReadOnly,
    isRequired,
    size,
    hasError = false,
    variation,
    ...rest
  },
  ref
) => {
  const { isFieldsetDisabled } = useFieldset();

  return (
    <View
      aria-invalid={hasError}
      as="textarea"
      className={textareaClasses(
        {
          _modifiers: [variation, size, hasError ? 'error' : undefined],
        },
        [fieldGroupClasses({ _element: 'control' }), className]
      )}
      disabled={isFieldsetDisabled ? isFieldsetDisabled : isDisabled}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
      {...rest}
    />
  );
};

export const TextArea: ForwardRefPrimitive<BaseTextAreaProps, 'textarea'> =
  primitiveWithForwardRef(TextAreaPrimitive);

TextArea.displayName = 'TextArea';
