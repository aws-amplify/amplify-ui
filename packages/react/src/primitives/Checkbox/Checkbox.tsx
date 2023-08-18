import * as React from 'react';
import classNames from 'classnames';

import { isFunction } from '@aws-amplify/ui';

import { Flex } from '../Flex';
import { IconCheck, IconIndeterminate, useIcons } from '../Icon';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { BaseCheckboxProps, CheckboxProps } from '../types/checkbox';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { getTestId } from '../utils/getTestId';
import { useStableId } from '../utils/useStableId';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { classNameModifierByFlag } from '../shared/utils';
import { View } from '../View';

const CheckboxPrimitive: Primitive<CheckboxProps, 'input'> = (
  {
    checked: controlledChecked,
    className,
    defaultChecked,
    hasError,
    isDisabled,
    isIndeterminate,
    label,
    labelHidden,
    labelPosition,
    onBlur: _onBlur,
    onFocus: _onFocus,
    onChange: _onChange,
    testId,
    inputStyles,
    ..._rest
  },
  ref
) => {
  const { styleProps, rest } = splitPrimitiveProps(_rest);

  const [focused, setFocused] = React.useState(false);
  const icons = useIcons('checkbox');

  const isControlled = controlledChecked !== undefined;
  const [localChecked, setLocalChecked] = React.useState(() =>
    // if controlled, initialize to `controlledChecked` else `defaultChecked`
    isControlled ? controlledChecked : defaultChecked
  );

  const checked = isControlled ? controlledChecked : localChecked;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFunction(_onChange)) {
      _onChange(e);
    }

    // in controlled mode, `controlledChecked` determines checked state
    if (!isControlled) {
      setLocalChecked(e.target.checked);
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isFunction(_onFocus)) {
      _onFocus(e);
    }
    setFocused(true);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isFunction(_onBlur)) {
      _onBlur(e);
    }
    setFocused(false);
  };

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
      focused
    )
  );
  const iconClasses = classNames(
    ComponentClassNames.CheckboxIcon,
    classNameModifierByFlag(
      ComponentClassNames.CheckboxIcon,
      'checked',
      checked
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
    'data-checked': localChecked,
    'data-disabled': isDisabled,
    'data-testid': iconTestId,
  };

  const checkedIcon = icons?.checked ? (
    <View as="span" className={classNames(iconClasses)}>
      {icons.checked}
    </View>
  ) : (
    <IconCheck {...iconProps} />
  );
  const indeterminateIcon = icons?.indeterminate ? (
    <View as="span" className={classNames(iconClasses)}>
      {icons.indeterminate}
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
          checked={controlledChecked}
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
        data-checked={checked}
        data-disabled={isDisabled}
        data-focus={focused}
        data-error={hasError}
        testId={buttonTestId}
        {...inputStyles}
      >
        {isIndeterminate ? indeterminateIcon : checkedIcon}
      </Flex>
    </Flex>
  );
};

export const Checkbox: ForwardRefPrimitive<BaseCheckboxProps, 'input'> =
  React.forwardRef(CheckboxPrimitive);

Checkbox.displayName = 'Checkbox';
