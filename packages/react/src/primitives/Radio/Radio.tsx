import classNames from 'classnames';
import React from 'react';

import { Flex } from '../Flex';
import { Input } from '../Input';
import { useRadioGroupContext } from '../RadioGroupField/context';
import { Text } from '../Text';
import { RadioProps } from '../types';
import { ComponentClassNames } from '../shared';

export const Radio: React.FC<RadioProps> = ({
  children,
  className,
  id,
  isDisabled,
  testId,
  value,
  ...rest
}) => {
  const {
    currentValue,
    defaultValue,
    name,
    hasError,
    isGroupDisabled,
    isRequired,
    isReadOnly,
    onChange,
    size,
  } = useRadioGroupContext();

  const shouldBeDisabled =
    isGroupDisabled || isDisabled || (isReadOnly && defaultValue !== value);

  // for controlled component
  const checked =
    currentValue !== undefined ? value === currentValue : undefined;

  // for uncontrolled component
  const defaultChecked =
    defaultValue !== undefined ? value === defaultValue : undefined;
  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Radio, className)}
      data-disabled={shouldBeDisabled}
    >
      <Input
        checked={checked}
        className={classNames(
          ComponentClassNames.VisuallyHidden,
          ComponentClassNames.RadioInput
        )}
        defaultChecked={defaultChecked}
        hasError={hasError}
        id={id}
        isDisabled={shouldBeDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        onChange={onChange}
        type="radio"
        name={name}
        value={value}
        {...rest}
      />
      <Flex
        aria-hidden="true"
        as="span"
        className={ComponentClassNames.RadioButton}
        data-size={size}
        testId={testId}
      />
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.RadioLabel}
          data-disabled={shouldBeDisabled}
        >
          {children}
        </Text>
      )}
    </Flex>
  );
};
