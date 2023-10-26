import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { Checkbox } from '../Checkbox';
import {
  BaseCheckboxFieldProps,
  CheckboxFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldErrorMessage } from '../Field';
import { getTestId } from '../utils/getTestId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { Flex } from '../Flex';

const CheckboxFieldPrimitive: Primitive<CheckboxFieldProps, 'input'> = (
  {
    className,
    errorMessage,
    hasError = false,
    labelHidden = false,
    labelPosition,
    testId,
    size,
    ...rest
  },
  ref
) => {
  const checkboxTestId = getTestId(testId, ComponentClassName.Checkbox);
  return (
    <Flex
      className={classNames(
        ComponentClassName.Field,
        ComponentClassName.CheckboxField,
        classNameModifier(ComponentClassName.Field, size),
        className
      )}
      testId={testId}
    >
      <Checkbox
        hasError={hasError}
        labelHidden={labelHidden}
        testId={checkboxTestId}
        labelPosition={labelPosition}
        ref={ref}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/checkboxfield)
 */
export const CheckboxField: ForwardRefPrimitive<
  BaseCheckboxFieldProps,
  'input'
> = primitiveWithForwardRef(CheckboxFieldPrimitive);

CheckboxField.displayName = 'CheckboxField';
