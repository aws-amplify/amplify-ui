import { useCallback } from 'react';

import { isFunction } from '../shared/utils';
import { ToggleButtonProps, ToggleButtonGroupProps } from '../types';
export const useToggleButtonGroup = (
  onChange: ToggleButtonGroupProps['onChange'],
  value: ToggleButtonGroupProps['value'],
  isExclusive = false,
  isSelectionRequired = false
) => {
  // Multiple selection
  const handleChange: ToggleButtonProps['onChange'] = useCallback(
    (buttonValue) => {
      if (!isFunction(onChange) || !Array.isArray(value)) {
        return;
      }

      const index = value.indexOf(buttonValue);
      let newValue: string[];

      const shouldToggleOff = index >= 0;
      if (shouldToggleOff) {
        // Toggle off
        newValue = [...value];
        if (!isSelectionRequired || newValue.length > 1) {
          newValue.splice(index, 1);
        }
      } else {
        // Toggle on
        newValue = [...value, buttonValue];
      }

      onChange(newValue);
    },
    [onChange, value, isSelectionRequired]
  );

  // Exclusive selection
  const handleExclusiveChange: ToggleButtonProps['onChange'] = useCallback(
    (buttonValue) => {
      if (!isFunction(onChange)) {
        return;
      }

      onChange(
        value === buttonValue && !isSelectionRequired ? null : buttonValue
      );
    },
    [onChange, value, isSelectionRequired]
  );

  return isExclusive ? handleExclusiveChange : handleChange;
};
