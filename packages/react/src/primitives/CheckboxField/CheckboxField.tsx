import classNames from 'classnames';

import { Checkbox } from '../Checkbox';
import { FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { CheckboxFieldProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared';
import { useTestId } from '../utils/testUtils';

export const CheckboxField: Primitive<CheckboxFieldProps, 'input'> = ({
  className,
  errorMessage,
  hasError = false,
  labelHidden = false,
  testId,
  size,
  ...rest
}) => {
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
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

CheckboxField.displayName = 'CheckboxField';
