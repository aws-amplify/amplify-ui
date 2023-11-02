import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
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
  const componentClasses = classNames(
    ComponentClassName.Textarea,
    ComponentClassName.FieldGroupControl,
    classNameModifier(ComponentClassName.Textarea, variation),
    classNameModifier(ComponentClassName.Textarea, size),
    classNameModifierByFlag(ComponentClassName.Textarea, 'error', hasError),
    className
  );
  const { isFieldsetDisabled } = useFieldset();

  return (
    <View
      aria-invalid={hasError}
      as="textarea"
      className={componentClasses}
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
