import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseTextFieldProps,
  TextFieldProps,
} from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { getFieldDescriptionId } from '../utils/getFieldDescriptionId';
import { getFieldErrorMessageId } from '../utils/getFieldErrorMessageId';
import { getAriaDescribedBy } from '../utils/getAriaDescribedBy';

const TextFieldPrimitive: Primitive<TextFieldProps, 'input'> = (props, ref) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    innerEndComponent,
    innerStartComponent,
    label,
    labelHidden = false,
    outerEndComponent,
    outerStartComponent,
    size,
    testId,
    variation,
    inputStyles,
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
        ComponentClassName.TextField,
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
      <FieldGroup
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
        innerStartComponent={innerStartComponent}
        innerEndComponent={innerEndComponent}
        variation={variation}
      >
        <Input
          aria-describedby={ariaDescribedBy}
          hasError={hasError}
          id={fieldId}
          ref={ref}
          size={size}
          variation={variation}
          {...inputStyles}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage
        id={errorId}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
export const TextField: ForwardRefPrimitive<BaseTextFieldProps, 'input'> =
  primitiveWithForwardRef(TextFieldPrimitive);

TextField.displayName = 'TextField';
