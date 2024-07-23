import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ForwardRefPrimitive, Primitive } from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { TextArea } from '../TextArea';
import {
  BaseTextAreaFieldProps,
  TextAreaFieldProps,
} from '../types/textAreaField';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { getAriaDescribedBy } from '../utils/getAriaDescribedBy';
import { getFieldDescriptionId } from '../utils/getFieldDescriptionId';
import { getFieldErrorMessageId } from '../utils/getFieldErrorMessageId';

export const DEFAULT_ROW_COUNT = 3;

const TextAreaFieldPrimitive: Primitive<TextAreaFieldProps, 'textarea'> = (
  props,
  ref
) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    label,
    labelHidden = false,
    rows,
    size,
    testId,
    inputStyles,
    // Destructuring the 'resize' style prop because while it is a style prop
    // it should go on the textarea element and not the wrapper div.
    resize,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const stableId = useStableId();
  const descriptionId = getFieldDescriptionId(stableId, descriptiveText);
  const errorId = getFieldErrorMessageId(stableId, hasError);
  const ariaDescribedBy = getAriaDescribedBy([errorId, descriptionId]);

  const { styleProps, rest } = splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassName.Field,
        classNameModifier(ComponentClassName.Field, size),
        ComponentClassName.TextAreaField,
        className
      )}
      testId={testId}
      {...styleProps}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <TextArea
        aria-describedby={ariaDescribedBy}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        resize={resize}
        {...rest}
        {...inputStyles}
      />
      <FieldErrorMessage
        id={errorId}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textareafield)
 */
export const TextAreaField: ForwardRefPrimitive<
  BaseTextAreaFieldProps,
  'textarea'
> = primitiveWithForwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextAreaField';
