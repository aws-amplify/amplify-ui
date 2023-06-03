import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Select } from '../Select';
import {
  BaseSelectFieldProps,
  SelectFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { useStableId } from '../utils/useStableId';

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
      // eslint-disable-next-line no-console
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
    label,
    labelHidden = false,
    options,
    size,
    testId,
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
        ComponentClassNames.SelectField,
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
      <Select
        aria-describedby={ariaDescribedBy}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        size={size}
        {...rest}
        {...inputStyles}
      >
        {selectFieldChildren({ children, options })}
      </Select>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/selectfield)
 */
export const SelectField: ForwardRefPrimitive<BaseSelectFieldProps, 'select'> =
  React.forwardRef(SelectFieldPrimitive);

SelectField.displayName = 'SelectField';
