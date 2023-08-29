import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { BaseTextAreaProps, TextAreaProps } from '../types/textArea';
import { View } from '../View';
import { useFieldset } from '../Fieldset/useFieldset';

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
    ComponentClassNames.Textarea,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Textarea, variation),
    classNameModifier(ComponentClassNames.Textarea, size),
    classNameModifierByFlag(ComponentClassNames.Textarea, 'error', hasError),
    className
  );
  const { isDisabled: isFieldsetDisabled } = useFieldset();

  return (
    <View
      aria-invalid={hasError}
      as="textarea"
      className={componentClasses}
      data-size={size}
      data-variation={variation}
      disabled={isFieldsetDisabled ? isFieldsetDisabled : isDisabled}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
      {...rest}
    />
  );
};

export const TextArea: ForwardRefPrimitive<BaseTextAreaProps, 'textarea'> =
  React.forwardRef(TextAreaPrimitive);

TextArea.displayName = 'TextArea';
