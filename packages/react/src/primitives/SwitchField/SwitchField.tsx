import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex } from '../Flex';
import { FieldErrorMessage } from '../Field';
import { Input } from '../Input';
import { Label } from '../Label';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseSwitchFieldProps,
  SwitchFieldProps,
} from '../types';
import { useStableId } from '../utils/useStableId';
import { useSwitch } from './useSwitch';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const SwitchFieldPrimitive: Primitive<SwitchFieldProps, 'div'> = (
  {
    className,
    defaultChecked,
    id,
    isChecked,
    isDisabled,
    isLabelHidden,
    label,
    labelPosition,
    name,
    onChange,
    size,
    thumbColor,
    trackCheckedColor,
    trackColor,
    value,
    hasError,
    errorMessage,
    ...rest
  },
  ref
) => {
  const { isOn, changeHandler, isFocused, setIsFocused } = useSwitch({
    onChange,
    isChecked,
    defaultChecked,
    isDisabled,
  });
  const { isFieldsetDisabled } = useFieldset();
  const shouldBeDisabled = isFieldsetDisabled ? isFieldsetDisabled : isDisabled;

  const fieldId = useStableId(id);

  const wrapperClasses = classNames(
    ComponentClassName.SwitchTrack,
    classNameModifierByFlag(ComponentClassName.SwitchTrack, 'checked', isOn),
    classNameModifierByFlag(
      ComponentClassName.SwitchTrack,
      'disabled',
      shouldBeDisabled
    ),
    classNameModifierByFlag(
      ComponentClassName.SwitchTrack,
      'focused',
      isFocused
    ),
    classNameModifierByFlag(ComponentClassName.SwitchTrack, 'error', hasError)
  );
  const componentClasses = classNames(
    ComponentClassName.SwitchThumb,
    classNameModifierByFlag(ComponentClassName.SwitchThumb, 'checked', isOn),
    classNameModifierByFlag(
      ComponentClassName.SwitchThumb,
      'disabled',
      shouldBeDisabled
    )
  );

  return (
    <Flex
      className={classNames(
        ComponentClassName.SwitchField,
        classNameModifier(ComponentClassName.SwitchField, size),
        labelPosition ? `amplify-label-${labelPosition}` : null,
        className
      )}
      ref={ref}
      {...rest}
    >
      <VisuallyHidden>
        <Input
          role="switch"
          type="checkbox"
          id={fieldId}
          onChange={changeHandler}
          disabled={isDisabled}
          name={name}
          checked={isOn}
          value={value}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </VisuallyHidden>
      <Label
        htmlFor={fieldId}
        className={classNames(
          ComponentClassName.SwitchWrapper,
          classNameModifier(ComponentClassName.SwitchWrapper, labelPosition)
        )}
      >
        {isLabelHidden ? (
          <VisuallyHidden as="span" className={ComponentClassName.SwitchLabel}>
            {label}
          </VisuallyHidden>
        ) : (
          <View as="span" className={ComponentClassName.SwitchLabel}>
            {label}
          </View>
        )}
        <View
          as="span"
          className={wrapperClasses}
          backgroundColor={isOn ? trackCheckedColor : trackColor}
        >
          <View
            as="span"
            className={componentClasses}
            data-checked={isOn}
            data-disabled={shouldBeDisabled}
            backgroundColor={thumbColor}
          ></View>
        </View>
      </Label>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/switchfield)
 */
export const SwitchField: ForwardRefPrimitive<BaseSwitchFieldProps, 'div'> =
  primitiveWithForwardRef(SwitchFieldPrimitive);

SwitchField.displayName = 'SwitchField';
