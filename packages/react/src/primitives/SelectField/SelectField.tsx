import * as React from 'react';
import classNames from 'classnames';

import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Select } from '../Select';
import { Label } from '../Label';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';
import { SelectFieldProps, PrimitiveWithForwardRef } from '../types';

const SelectFieldPrimitive: PrimitiveWithForwardRef<
  SelectFieldProps,
  'select'
> = (props, ref) => {
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
