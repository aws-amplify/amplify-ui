import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Select } from '../Select';
import { SelectFieldProps, Primitive } from '../types';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';

const SelectFieldPrimitive: Primitive<SelectFieldProps, 'select'> = (
  props,
  ref
) => {
  const {
    children,
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    label,
    labelHidden = false,
    size,
    testId,
    ..._rest
  } = props;

  const fieldId = useStableId(id);

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SelectField,
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
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Select hasError={hasError} id={fieldId} ref={ref} size={size} {...rest}>
        {children}
      </Select>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const SelectField = React.forwardRef(SelectFieldPrimitive);

SelectField.displayName = 'SelectField';
