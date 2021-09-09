import classNames from 'classnames';
import React from 'react';

import { Flex } from '../Flex';
import { Input } from '../Input';
import { useRadioGroupContext } from '../RadioGroup/context';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { RadioProps } from '../types';
import { ComponentClassNames } from '../shared';

export const Radio: React.FC<RadioProps> = ({
  children,
  className,
  id,
  isDisabled,
  value,
  ...rest
}) => {
  const {
    currentValue,
    defaultValue,
    name,
    hasError,
    isGroupDisabled,
    isReadOnly,
    isRequired,
    onChange,
    size,
  } = useRadioGroupContext();

  const shouldDisabled = isDisabled || isGroupDisabled;
  return (
    <Flex
      as="label"
      alignItems="center"
      className={classNames(ComponentClassNames.Radio, className)}
      gap="0.5rem"
      justifyContent="flex-start"
    >
      <VisuallyHidden
        as={Input}
        checked={value === currentValue}
        className={ComponentClassNames.RadioInput}
        defaultChecked={value === defaultValue}
        hasError={hasError}
        id={id}
        isDisabled={shouldDisabled}
        onChange={onChange}
        readOnly={isReadOnly}
        required={isRequired}
        type="radio"
        name={name}
        value={value}
      />
      <Flex
        alignItems="center"
        aria-hidden="true"
        as="span"
        className={ComponentClassNames.RadioButton}
        justifyContent="center"
        data-size={size}
        {...rest}
      />
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.RadioLabel}
          data-size={size}
        >
          {children}
        </Text>
      )}
    </Flex>
  );
};
