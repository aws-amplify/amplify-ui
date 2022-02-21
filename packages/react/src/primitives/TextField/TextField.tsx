import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { Primitive } from '../types';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { TextFieldProps } from '../types';
import { useStableId } from '../shared/utils';

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
    inputStyles,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextField,
        className
      )}
      data-size={size}
      testId={testId}
      {...baseStyleProps}
      {...flexContainerStyleProps}
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
      >
        <Input
          aria-describedby={descriptionId}
          hasError={hasError}
          id={fieldId}
          ref={ref}
          size={size}
          {...inputStyles}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const TextField = React.forwardRef(TextFieldPrimitive);

TextFieldPrimitive.displayName = 'TextField';
