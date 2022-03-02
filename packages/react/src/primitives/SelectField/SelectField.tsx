import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { LABEL_HIDDEN_DEPRECATED } from '../../helpers/messages';
import { Select } from '../Select';
import { SelectFieldProps, Primitive } from '../types';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { useStableId } from '../shared/utils';

interface SelectFieldChildrenProps {
  children?: React.ReactNode;
  options?: SelectFieldProps['options'];
}

const selectFieldChildren = ({
  children,
  options,
}: SelectFieldChildrenProps) => {
  if (children) {
    if (options?.length) {
      console.warn(
        'Amplify UI: <SelectField> component  defaults to rendering children over `options`. When using the `options` prop, omit children.'
      );
    }
    return children;
  }

  return options?.map((option, index) => (
    <option label={option} value={option} key={`${option}-${index}`}>
      {option}
    </option>
  ));
};

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
    isLabelHidden = false,
    label,
    labelHidden = false,
    options,
    size,
    testId,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  useDeprecationWarning({
    shouldWarn: labelHidden,
    message: LABEL_HIDDEN_DEPRECATED,
  });

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
      <Label htmlFor={fieldId} visuallyHidden={isLabelHidden || labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        isLabelHidden={isLabelHidden || labelHidden}
        descriptiveText={descriptiveText}
      />
      <Select
        aria-describedby={descriptionId}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        size={size}
        {...rest}
      >
        {selectFieldChildren({ children, options })}
      </Select>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const SelectField = React.forwardRef(SelectFieldPrimitive);

SelectField.displayName = 'SelectField';
