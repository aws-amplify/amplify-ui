import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { Primitive, SwitchFieldProps } from '../types';
import { useStableId } from '../utils/useStableId';
import { useSwitch } from './useSwitch';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';

const SwitchFieldPrimitive: Primitive<SwitchFieldProps, typeof Flex> = (
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

  const fieldId = useStableId(id);
  const LabelType = isLabelHidden ? VisuallyHidden : View;

  return (
    <Flex
      className={classNames(
        ComponentClassNames.SwitchField,
        classNameModifier(ComponentClassNames.SwitchField, size),
        className
      )}
      data-size={size}
      data-label-position={labelPosition}
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
          ComponentClassNames.SwitchWrapper,
          classNameModifier(ComponentClassNames.SwitchWrapper, labelPosition)
        )}
        data-label-position={labelPosition}
      >
        <LabelType as="span" className={ComponentClassNames.SwitchLabel}>
          {label}
        </LabelType>
        <View
          as="span"
          className={classNames(
            ComponentClassNames.SwitchTrack,
            classNameModifier(ComponentClassNames.SwitchTrack, 'checked', isOn),
            classNameModifier(
              ComponentClassNames.SwitchTrack,
              'disabled',
              isDisabled
            ),
            classNameModifier(
              ComponentClassNames.SwitchTrack,
              'focused',
              isFocused
            )
          )}
          data-checked={isOn}
          data-disabled={isDisabled}
          data-focused={isFocused}
          backgroundColor={isOn ? trackCheckedColor : trackColor}
        >
          <View
            as="span"
            className={classNames(
              ComponentClassNames.SwitchThumb,
              classNameModifier(
                ComponentClassNames.SwitchThumb,
                'checked',
                isOn
              ),
              classNameModifier(
                ComponentClassNames.SwitchThumb,
                'disabled',
                isDisabled
              )
            )}
            data-checked={isOn}
            data-disabled={isDisabled}
            backgroundColor={thumbColor}
          ></View>
        </View>
      </Label>
    </Flex>
  );
};

export const SwitchField = React.forwardRef(SwitchFieldPrimitive);

SwitchField.displayName = 'SwitchField';
