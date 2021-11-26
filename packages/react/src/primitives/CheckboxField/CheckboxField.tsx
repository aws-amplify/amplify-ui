import * as React from 'react';
import classNames from 'classnames';

import { Checkbox } from '../Checkbox';
import { FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { CheckboxFieldProps, PrimitiveWithForwardRef } from '../types';
import { ComponentClassNames } from '../shared';
import { useTestId } from '../utils/testUtils';

const CheckboxFieldPrimitive: PrimitiveWithForwardRef<
  CheckboxFieldProps,
  'input'
> = (
  {
    className,
    errorMessage,
    hasError = false,
    labelHidden = false,
    testId,
    size,
    ...rest
  },
  ref
) => {
  const checkboxTestId = useTestId(testId, ComponentClassNames.Checkbox);
  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.CheckboxField,
        className
      )}
      data-size={size}
      testId={testId}
    >
      <Checkbox
        hasError={hasError}
        labelHidden={labelHidden}
        testId={checkboxTestId}
        ref={ref}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const CheckboxField = React.forwardRef(CheckboxFieldPrimitive);

CheckboxField.displayName = 'CheckboxField';
