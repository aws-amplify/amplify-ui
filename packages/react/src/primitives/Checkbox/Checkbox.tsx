import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { IconCheck, IconIndeterminate } from '../Icon/internal';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { BaseCheckboxProps, CheckboxProps } from '../types/checkbox';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { getTestId } from '../utils/getTestId';
import { useStableId } from '../utils/useStableId';
import { useCheckbox } from './useCheckbox';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { classNameModifierByFlag } from '../shared/utils';
import { useIcons } from '../../hooks/useIcons';
import { View } from '../View';

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
  const icons = useIcons();

  React.useEffect(() => {
    const isControlled = checked !== undefined;
    if (isControlled && checked !== dataChecked) {
      setDataChecked(checked);
    }
  }, [checked, dataChecked, setDataChecked]);

  const dataId = useStableId();
  React.useEffect(() => {
    const input = document.querySelector(`[data-id="${dataId}"]`);
    if (input && typeof isIndeterminate === 'boolean') {
      // HTMLInputElement does not have an `indeterminate` attribute
      (input as HTMLInputElement & { indeterminate: boolean }).indeterminate =
        isIndeterminate;
    }
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
    ),
    classNameModifierByFlag(
      ComponentClassNames.CheckboxIcon,
      'indeterminate',
      isIndeterminate
    )
  );
  const iconProps = {
    className: classNames(iconClasses),
    'data-checked': dataChecked,
    'data-disabled': isDisabled,
    'data-testid': iconTestId,
  };

  const checkedIcon = icons?.checkbox?.checked ? (
    <View as="span" className={classNames(iconClasses)}>
      {icons.checkbox.checked}
    </View>
  ) : (
    <IconCheck {...iconProps} />
  );
  const indeterminateIcon = icons?.checkbox?.indeterminate ? (
    <View as="span" className={classNames(iconClasses)}>
      {icons.checkbox.indeterminate}
    </View>
  ) : (
    <IconIndeterminate {...iconProps} />
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
        {/* <View as="span"
          className={classNames(iconClasses)}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-testid={iconTestId}>
          {isIndeterminate ? indeterminateIcon : checkedIcon}
        </View> */}
        {isIndeterminate ? indeterminateIcon : checkedIcon}
      </Flex>
    </Flex>
  );
};

export const Checkbox: ForwardRefPrimitive<BaseCheckboxProps, 'input'> =
  React.forwardRef(CheckboxPrimitive);

Checkbox.displayName = 'Checkbox';
