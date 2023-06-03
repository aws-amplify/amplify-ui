import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared';
import { Flex } from '../Flex';
import { Input } from '../Input';
import {
  BaseRadioProps,
  RadioProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
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
    height, // @TODO: remove custom destructuring for 3.0 release
    width, // @TODO: remove custom destructuring for 3.0 release
    bottom, // @TODO: remove custom destructuring for 3.0 release
    left, // @TODO: remove custom destructuring for 3.0 release
    position, // @TODO: remove custom destructuring for 3.0 release
    padding, // @TODO: remove custom destructuring for 3.0 release
    right, // @TODO: remove custom destructuring for 3.0 release
    top, // @TODO: remove custom destructuring for 3.0 release
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
      className={classNames(
        ComponentClassNames.Radio,
        classNameModifierByFlag(
          ComponentClassNames.Radio,
          `disabled`,
          shouldBeDisabled
        ),
        className
      )}
      data-disabled={shouldBeDisabled}
      data-label-position={labelPosition}
      height={height}
      width={width}
      bottom={bottom}
      top={top}
      right={right}
      left={left}
      position={position}
      padding={padding}
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
        className={classNames(
          ComponentClassNames.RadioButton,
          classNameModifier(ComponentClassNames.RadioButton, size)
        )}
        data-size={size}
        testId={testId}
      />
    </Flex>
  );
};

export const Radio: ForwardRefPrimitive<BaseRadioProps, 'input'> =
  React.forwardRef(RadioPrimitive);

Radio.displayName = 'Radio';
