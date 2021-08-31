import React from 'react';
import { nanoid } from 'nanoid';

import { useSwitch } from './useSwitch';
import { Label } from '../Label';
import { Input } from '../Input';
import { View } from '../View';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';
import classNames from 'classnames';

const addAttr = (active: boolean) => (active ? '' : undefined);

export const SwitchField = (props) => {
  const {
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
    trackColor,
    trackCheckedColor,
    value,
    ...rest
  } = props;
  const { isOn, changeHandler, isFocused, setIsFocused } = useSwitch({
    onChange,
    isChecked,
    defaultChecked,
    isDisabled,
  });

  const fieldId = useAmplifyFieldID(id);

  return (
    <Label
      className={classNames(ComponentClassNames.SwitchField, className)}
      htmlFor={fieldId}
      data-size={size}
      data-label-position={labelPosition}
      {...rest}
    >
      <View
        as={'span'}
        className={classNames(
          {
            'sr-only': isLabelHidden,
          },
          ComponentClassNames.SwitchLabel
        )}
      >
        {label}
      </View>
      <Input
        type="checkbox"
        id={fieldId}
        onChange={changeHandler}
        className={'sr-only'}
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
      <View
        as={'span'}
        className={ComponentClassNames.SwitchTrack}
        data-checked={addAttr(isOn)}
        data-disabled={addAttr(isDisabled)}
        data-focused={addAttr(isFocused)}
        backgroundColor={isOn ? trackCheckedColor : trackColor}
      >
        <View
          as={'span'}
          className={ComponentClassNames.SwitchThumb}
          data-checked={addAttr(isOn)}
          data-disabled={addAttr(isDisabled)}
          backgroundColor={thumbColor}
        ></View>
      </View>
    </Label>
  );
};
