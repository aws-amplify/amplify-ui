import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { RadioProps, Primitive } from '../types';
import { Text } from '../Text';
import { useRadioGroupContext } from '../RadioGroupField/context';

export const RadioPrimitive: Primitive<RadioProps, 'input'> = (
  {
    children,
    className,
    id,
    isDisabled,
    testId,
    value,
    labelPosition: radioLabelPosition,
    ...rest
  },
  ref
) => {
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
    labelPosition: groupLabelPosition,
  } = useRadioGroupContext();

  const shouldBeDisabled =
    isGroupDisabled || isDisabled || (isReadOnly && defaultValue !== value);

  // for controlled component
  const checked =
    currentValue !== undefined ? value === currentValue : undefined;

  // for uncontrolled component
  const defaultChecked =
    defaultValue !== undefined ? value === defaultValue : undefined;

  const labelPosition = radioLabelPosition
    ? radioLabelPosition
    : groupLabelPosition;
  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Radio, className)}
      data-disabled={shouldBeDisabled}
      data-label-position={labelPosition}
    >
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.RadioLabel}
          data-disabled={shouldBeDisabled}
        >
          {children}
        </Text>
      )}
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
        ref={ref}
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
    </Flex>
  );
};

export const Radio = React.forwardRef(RadioPrimitive);

Radio.displayName = 'Radio';
