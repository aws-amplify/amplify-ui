import * as React from 'react';

import { isFunction } from '../shared/utils';
import { ToggleButtonProps, ToggleButtonGroupProps } from '../types';
export const useToggleButtonGroup = (
  onChange: ToggleButtonGroupProps['onChange'],
  value: ToggleButtonGroupProps['value'],
  isExclusive = false
) => {
  // Multiple selection
  const handleChange: ToggleButtonProps['onChange'] = React.useCallback(
    (buttonValue) => {
      if (!isFunction(onChange) || !Array.isArray(value)) {
        return;
      }

      const index = value.indexOf(buttonValue);
      let newValue;

      const shouldToggleOff = index >= 0;
      if (shouldToggleOff) {
        // Toggle off
        newValue = [...value];
        newValue.splice(index, 1);
      } else {
        // Toggle on
        newValue = [...value, buttonValue];
      }

      onChange(newValue);
    },
    [onChange, value]
  );

  // Exclusive selection
  const handleExclusiveChange: ToggleButtonProps['onChange'] =
    React.useCallback(
      (buttonValue) => {
        if (!onChange) {
          return;
        }

        onChange(value === buttonValue ? null : buttonValue);
      },
      [onChange, value]
    );

  return isExclusive ? handleExclusiveChange : handleChange;
};
