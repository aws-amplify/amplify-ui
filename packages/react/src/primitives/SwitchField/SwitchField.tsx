import React from 'react';
import { nanoid } from 'nanoid';

import { useSwitch } from './useSwitch';
import { Label } from '../Label';
import { Input } from '../Input';
import { View } from '../View';
import { ComponentClassNames } from '../shared';
import classNames from 'classnames';

export const SwitchField = (props) => {
  const {
    id,
    thumbColor,
    trackColor,
    trackCheckedColor,
    isDisabled,
    name,
    size,
    label,
    isLabelHidden,
    isChecked,
    onChange,
    defaultChecked,
    value,
    className,
    ...rest
  } = props;
  const { isOn, changeHandler } = useSwitch({
    onChange,
    isChecked,
    defaultChecked,
    isDisabled,
  });

  const fieldId = React.useMemo(() => {
    if (id) {
      return id;
    }
    return `amplify-field-${nanoid()}`;
  }, []);

  return (
    <Label
      className={classNames(ComponentClassNames.SwitchField, className)}
      htmlFor={fieldId}
      data-size={size}
      {...rest}
    >
      <View
        as={'span'}
        className={classNames(
          {
            'sr-only': isLabelHidden,
          },
          'amplify-switch-label'
        )}
      >
        {label}
      </View>
      <Input
        type="checkbox"
        id={fieldId}
        onChange={changeHandler}
        className="sr-only"
        disabled={isDisabled}
        name={name}
        checked={isOn}
        value={value}
      />
      <View
        as={'span'}
        className={'amplify-switch-track'}
        data-checked={isOn}
        backgroundColor={isOn ? trackCheckedColor : trackColor}
      >
        <View
          as={'span'}
          className={'amplify-switch-thumb'}
          data-checked={isOn}
          backgroundColor={thumbColor}
        ></View>
      </View>
    </Label>
  );
};
