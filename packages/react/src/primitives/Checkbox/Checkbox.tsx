import * as React from 'react';
import classNames from 'classnames';

import { CheckboxProps } from '../types/checkbox';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { IconCheck } from '../Icon';
import { Input } from '../Input';
import { Primitive } from '../types/view';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { Text } from '../Text';
import { useCheckbox } from './useCheckbox';
import { VisuallyHidden } from '../VisuallyHidden';
import { useTestId } from '../utils/testUtils';

const CheckboxPrimitive: Primitive<CheckboxProps, 'input'> = (
  {
    checked,
    className,
    defaultChecked,
    hasError,
    isDisabled,
    label,
    labelHidden,
    labelPosition,
    onChange: onChangeProp,
    size,
    testId,
    ..._rest
  },
  ref
) => {
  const { baseStyleProps, flexContainerStyleProps, rest } =
    splitPrimitiveProps(_rest);

  // controlled way should always override uncontrolled way
  const initialChecked = checked !== undefined ? checked : defaultChecked;

  const { dataChecked, dataFocus, onBlur, onChange, onFocus, setDataChecked } =
    useCheckbox(initialChecked, onChangeProp);

  React.useEffect(() => {
    const isControlled = checked !== undefined;
    if (isControlled && checked !== dataChecked) {
      setDataChecked(checked);
    }
  }, [checked, dataChecked, setDataChecked]);

  const buttonTestId = useTestId(testId, ComponentClassNames.CheckboxButton);
  const iconTestId = useTestId(testId, ComponentClassNames.CheckboxIcon);
  const labelTestId = useTestId(testId, ComponentClassNames.CheckboxLabel);

  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
      data-disabled={isDisabled}
      data-label-position={labelPosition}
      testId={testId}
      {...baseStyleProps}
      {...flexContainerStyleProps}
    >
      <VisuallyHidden>
        <Input
          checked={checked}
          className={ComponentClassNames.CheckboxInput}
          defaultChecked={defaultChecked}
          isDisabled={isDisabled}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          type="checkbox"
          {...rest}
        />
      </VisuallyHidden>
      {label && (
        <Text
          as="span"
          className={classNames(ComponentClassNames.CheckboxLabel, {
            [ComponentClassNames.VisuallyHidden]: labelHidden,
          })}
          data-disabled={isDisabled}
          testId={labelTestId}
        >
          {label}
        </Text>
      )}
      <Flex
        aria-hidden="true"
        as="span"
        className={ComponentClassNames.CheckboxButton}
        data-checked={dataChecked}
        data-disabled={isDisabled}
        data-focus={dataFocus}
        data-error={hasError}
        testId={buttonTestId}
      >
        <IconCheck
          className={ComponentClassNames.CheckboxIcon}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-testid={iconTestId}
          size={size}
        />
      </Flex>
    </Flex>
  );
};

export const Checkbox = React.forwardRef(CheckboxPrimitive);

Checkbox.displayName = 'Checkbox';
