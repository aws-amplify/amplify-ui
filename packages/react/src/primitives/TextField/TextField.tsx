import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
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
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { styleProps, rest } = splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        ComponentClassNames.TextField,
        className
      )}
      data-size={size}
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
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
export const TextField: ForwardRefPrimitive<BaseTextFieldProps, 'input'> =
  React.forwardRef(TextFieldPrimitive);

TextField.displayName = 'TextField';
