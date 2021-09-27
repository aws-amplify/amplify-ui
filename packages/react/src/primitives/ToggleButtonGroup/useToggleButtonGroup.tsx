import { useCallback } from 'react';

import { ToggleButtonProps, ToggleButtonGroupProps } from '../types';
export const useToggleButtonGroup = (
  onChange: ToggleButtonGroupProps['onChange'],
  value: ToggleButtonGroupProps['value'],
  isExclusive = false
) => {
  // Multiple selection
  const handleChange: ToggleButtonProps['onChange'] = useCallback(
    (e, buttonValue) => {
      if (!onChange || !Array.isArray(value)) {
        return;
      }

      const index = value.indexOf(buttonValue);
      let newValue;

      if (index >= 0) {
        newValue = [...value];
        newValue.splice(index, 1);
      } else {
        newValue = [...value, buttonValue];
      }

      onChange(e, newValue);
    },
    [onChange, value]
  );

  // Exclusive selection
  const handleExclusiveChange: ToggleButtonProps['onChange'] = useCallback(
    (e, buttonValue) => {
      if (!onChange) {
        return;
      }

      onChange(e, value === buttonValue ? null : buttonValue);
    },
    [onChange, value]
  );

  return isExclusive ? handleExclusiveChange : handleChange;
};
