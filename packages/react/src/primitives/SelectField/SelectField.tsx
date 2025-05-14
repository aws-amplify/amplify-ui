import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Select } from '../Select';
import type {
  BaseSelectFieldProps,
  SelectFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { createSpaceSeparatedIds } from '../utils/createSpaceSeparatedIds';
import { DESCRIPTION_SUFFIX, ERROR_SUFFIX } from '../../helpers/constants';
import { getUniqueComponentId } from '../utils/getUniqueComponentId';

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
        ComponentClassName.SelectField,
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
      <FieldErrorMessage
        id={errorId}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/selectfield)
 */
export const SelectField: ForwardRefPrimitive<BaseSelectFieldProps, 'select'> =
  primitiveWithForwardRef(SelectFieldPrimitive);

SelectField.displayName = 'SelectField';
