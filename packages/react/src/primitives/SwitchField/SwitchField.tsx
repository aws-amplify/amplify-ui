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
    ...rest
  } = props;
  const { isChecked, changeHandler } = useSwitch({});

  const fieldId = React.useMemo(() => {
    if (id) {
      return id;
    }
    return `amplify-field-${nanoid()}`;
  }, []);

  return (
    <Label
      className={ComponentClassNames.SwitchField}
      htmlFor={fieldId}
      data-size={size}
    >
      <View
        as={'span'}
        className={classNames({
          'sr-only': isLabelHidden,
        })}
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
      />
      <View
        as={'span'}
        className={'track'}
        data-checked={isChecked}
        backgroundColor={isChecked ? trackCheckedColor : trackColor}
      >
        <View
          as={'span'}
          className={'thumb'}
          data-checked={isChecked}
          backgroundColor={thumbColor}
        ></View>
      </View>
    </Label>
  );
};
