import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { IconCheck, IconIndeterminate } from '../Icon/internal';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { CheckboxProps } from '../types/checkbox';
import { Primitive } from '../types/view';
import { getTestId } from '../utils/testUtils';
import { useStableId } from '../utils/useStableId';
import { useCheckbox } from './useCheckbox';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { classNameModifierByFlag } from '../shared/utils';

const CheckboxPrimitive: Primitive<CheckboxProps, 'input'> = (
  {
    checked,
    className,
    defaultChecked,
    hasError,
    isDisabled,
    isIndeterminate,
    label,
    labelHidden,
    labelPosition,
    onChange: onChangeProp,
    testId,
    inputStyles,
    ..._rest
  },
  ref
) => {
  const { styleProps, rest } = splitPrimitiveProps(_rest);
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

  const dataId = useStableId();
  React.useEffect(() => {
    const input = document.querySelector(`[data-id="${dataId}"]`);
    // HTMLInputElement does not have an `indeterminate` attribute
    (input as HTMLInputElement & { indeterminate: boolean }).indeterminate =
      isIndeterminate;
  }, [dataId, isIndeterminate]);

  const buttonTestId = getTestId(testId, ComponentClassNames.CheckboxButton);
  const iconTestId = getTestId(testId, ComponentClassNames.CheckboxIcon);
  const labelTestId = getTestId(testId, ComponentClassNames.CheckboxLabel);
  const flexClasses = classNames(
    ComponentClassNames.CheckboxButton,
    classNameModifierByFlag(
      ComponentClassNames.CheckboxButton,
      'disabled',
      isDisabled
    ),
    classNameModifierByFlag(
      ComponentClassNames.CheckboxButton,
      'error',
      hasError
    ),
    classNameModifierByFlag(
      ComponentClassNames.CheckboxButton,
      'focused',
      dataFocus
    )
  );
  const iconClasses = classNames(
    ComponentClassNames.CheckboxIcon,
    classNameModifierByFlag(
      ComponentClassNames.CheckboxIcon,
      'checked',
      dataChecked
    ),
    classNameModifierByFlag(
      ComponentClassNames.CheckboxIcon,
      'disabled',
      isDisabled
    )
  );

  const renderedIcon = React.useMemo(
    () =>
      isIndeterminate ? (
        <IconIndeterminate
          className={classNames(
            iconClasses,
            classNameModifierByFlag(
              ComponentClassNames.CheckboxIcon,
              'indeterminate',
              isIndeterminate
            )
          )}
          data-testid={iconTestId}
        />
      ) : (
        <IconCheck
          className={iconClasses}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-testid={iconTestId}
        />
      ),
    [dataChecked, iconClasses, iconTestId, isDisabled, isIndeterminate]
  );

  return (
    <Flex
      as="label"
      className={classNames(
        ComponentClassNames.Checkbox,
        classNameModifierByFlag(
          ComponentClassNames.Checkbox,
          'disabled',
          isDisabled
        ),
        className
      )}
      data-disabled={isDisabled}
      data-label-position={labelPosition}
      testId={testId}
      {...styleProps}
    >
      <VisuallyHidden>
        <Input
          checked={checked}
          className={ComponentClassNames.CheckboxInput}
          data-id={dataId}
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
        className={flexClasses}
        data-checked={dataChecked}
        data-disabled={isDisabled}
        data-focus={dataFocus}
        data-error={hasError}
        testId={buttonTestId}
        {...inputStyles}
      >
        {renderedIcon}
      </Flex>
    </Flex>
  );
};

export const Checkbox = React.forwardRef(CheckboxPrimitive);

Checkbox.displayName = 'Checkbox';
