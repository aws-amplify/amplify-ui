import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ForwardRefPrimitive, Primitive } from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { TextArea, AutoresizeTextArea } from '../TextArea';
import {
  BaseTextAreaFieldProps,
  TextAreaFieldProps,
} from '../types/textAreaField';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { createSpaceSeparatedIds } from '../utils/createSpaceSeparatedIds';
import { DESCRIPTION_SUFFIX, ERROR_SUFFIX } from '../../helpers/constants';
import { getUniqueComponentId } from '../utils/getUniqueComponentId';

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
    autoResize,
    // Destructuring the 'resize' style prop because while it is a style prop
    // it should go on the textarea element and not the wrapper div.
    resize,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const stableId = useStableId();
  const descriptionId = descriptiveText
    ? getUniqueComponentId(stableId, DESCRIPTION_SUFFIX)
    : undefined;
  const errorId = hasError
    ? getUniqueComponentId(stableId, ERROR_SUFFIX)
    : undefined;
  const ariaDescribedBy = createSpaceSeparatedIds([errorId, descriptionId]);

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
      {autoResize ? (
        <AutoresizeTextArea
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
      ) : (
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
      )}
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
