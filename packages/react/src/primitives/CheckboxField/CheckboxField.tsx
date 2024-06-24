import * as React from 'react';
import { checkboxFieldClasses, fieldClasses } from '@aws-amplify/ui';

import { Checkbox } from '../Checkbox';
import {
  BaseCheckboxFieldProps,
  CheckboxFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
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
  const checkboxTestId = getTestId(testId, checkboxFieldClasses());
  return (
    <Flex
      className={checkboxFieldClasses(undefined, [
        fieldClasses({ _modifiers: [size] }),
        className,
      ])}
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
