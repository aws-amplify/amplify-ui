import * as React from 'react';
import { checkboxClasses, isFunction } from '@aws-amplify/ui';

import { Flex } from '../Flex';
import { IconCheck, IconIndeterminate, useIcons } from '../Icon';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { BaseCheckboxProps, CheckboxProps } from '../types/checkbox';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { getTestId } from '../utils/getTestId';
import { useStableId } from '../utils/useStableId';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { View } from '../View';
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

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
  const { isFieldsetDisabled } = useFieldset();
  const shouldBeDisabled = isFieldsetDisabled ? isFieldsetDisabled : isDisabled;

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

  const buttonTestId = getTestId(
    testId,
    checkboxClasses({ _element: 'button' })
  );
  const iconTestId = getTestId(testId, checkboxClasses({ _element: 'icon' }));
  const labelTestId = getTestId(testId, checkboxClasses({ _element: 'label' }));

  const flexClasses = checkboxClasses({
    _element: {
      button: [
        shouldBeDisabled ? 'disabled' : undefined,
        hasError ? 'error' : undefined,
        focused ? 'focused' : undefined,
      ],
    },
  });

  const iconClasses = checkboxClasses({
    _element: {
      icon: [
        checked ? 'checked' : undefined,
        isDisabled ? 'disabled' : undefined,
        isIndeterminate ? 'indeterminate' : undefined,
      ],
    },
  });

  const iconProps = {
    className: iconClasses,
    'data-checked': localChecked,
    'data-disabled': shouldBeDisabled,
    'data-testid': iconTestId,
  };

  const checkedIcon = icons?.checked ? (
    <View as="span" className={iconClasses}>
      {icons.checked}
    </View>
  ) : (
    <IconCheck {...iconProps} />
  );
  const indeterminateIcon = icons?.indeterminate ? (
    <View as="span" className={iconClasses}>
      {icons.indeterminate}
    </View>
  ) : (
    <IconIndeterminate {...iconProps} />
  );

  return (
    <Flex
      as="label"
      className={checkboxClasses(
        {
          _modifiers: [shouldBeDisabled ? 'disabled' : undefined],
        },
        [
          className,
          // TODO: fix this
          labelPosition ? `amplify-label-${labelPosition}` : null,
        ]
      )}
      testId={testId}
      {...styleProps}
    >
      <VisuallyHidden>
        <Input
          checked={controlledChecked}
          className={checkboxClasses({ _element: 'input' })}
          data-id={dataId}
          defaultChecked={defaultChecked}
          isDisabled={shouldBeDisabled}
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
          className={checkboxClasses(
            {
              _element: 'label',
              _modifiers: [shouldBeDisabled ? 'disabled' : undefined],
            },
            [labelHidden ? 'amplify-visually-hidden' : undefined]
          )}
          data-disabled={shouldBeDisabled}
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
        data-disabled={shouldBeDisabled}
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
  primitiveWithForwardRef(CheckboxPrimitive);

Checkbox.displayName = 'Checkbox';
