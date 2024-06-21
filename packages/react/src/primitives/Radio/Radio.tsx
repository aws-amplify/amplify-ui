import * as React from 'react';
import { radioClasses } from '@aws-amplify/ui';

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
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const RadioPrimitive: Primitive<RadioProps, 'input'> = (
  {
    children,
    className,
    id,
    isDisabled = false,
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
    isGroupDisabled = false,
    isRequired,
    isReadOnly,
    onChange,
    size,
    labelPosition: groupLabelPosition,
  } = useRadioGroupContext();
  const { isFieldsetDisabled } = useFieldset();

  const shouldBeDisabled = isFieldsetDisabled
    ? isFieldsetDisabled
    : isGroupDisabled || isDisabled || (isReadOnly && defaultValue !== value);

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
      className={radioClasses(
        {
          _modifiers: [shouldBeDisabled ? 'disabled' : undefined],
        },
        [labelPosition ? `amplify-label-${labelPosition}` : null, className]
      )}
    >
      {children && (
        <Text
          as="span"
          className={radioClasses({
            _element: {
              label: { disabled: shouldBeDisabled },
            },
          })}
        >
          {children}
        </Text>
      )}
      <Input
        checked={checked}
        className={radioClasses(
          {
            _element: 'input',
          },
          ['amplify-visually-hidden']
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
        className={radioClasses({
          _element: {
            button: [size],
          },
        })}
        testId={testId}
      />
    </Flex>
  );
};

export const Radio: ForwardRefPrimitive<BaseRadioProps, 'input'> =
  primitiveWithForwardRef(RadioPrimitive);

Radio.displayName = 'Radio';
