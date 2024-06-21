import * as React from 'react';
import { switchClasses, switchFieldClasses } from '@aws-amplify/ui';

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

  return (
    <Flex
      className={switchFieldClasses(
        {
          _modifiers: [size],
        },
        [className, labelPosition ? `amplify-label-${labelPosition}` : null]
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
        className={switchClasses({
          _element: {
            wrapper: [labelPosition],
          },
        })}
      >
        {isLabelHidden ? (
          <VisuallyHidden
            as="span"
            className={switchClasses({ _element: 'label' })}
          >
            {label}
          </VisuallyHidden>
        ) : (
          <View as="span" className={switchClasses({ _element: 'label' })}>
            {label}
          </View>
        )}
        <View
          as="span"
          className={switchClasses({
            _element: {
              track: {
                checked: isOn,
                disabled: shouldBeDisabled,
                focused: isFocused,
                error: hasError,
              },
            },
          })}
          backgroundColor={isOn ? trackCheckedColor : trackColor}
        >
          <View
            as="span"
            className={switchClasses({
              _element: {
                thumb: [
                  isOn ? 'checked' : undefined,
                  shouldBeDisabled ? 'disabled' : undefined,
                ],
              },
            })}
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
