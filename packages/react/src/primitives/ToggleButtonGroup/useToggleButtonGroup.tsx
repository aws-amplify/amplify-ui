import * as React from 'react';
import { isFunction, isString } from '@aws-amplify/ui';

import { ToggleButtonGroupProps } from '../types';

type UseToggleButtonParams = Pick<
  ToggleButtonGroupProps,
  'onChange' | 'value' | 'isExclusive' | 'isSelectionRequired'
>;

export const useToggleButtonGroup = ({
  onChange,
  value,
  isExclusive = false,
  isSelectionRequired = false,
}: UseToggleButtonParams): ((value: string | undefined) => void) => {
  // Multiple selection
  const handleChange = React.useCallback<
    (buttonValue: string | undefined) => void
  >(
    (buttonValue) => {
      if (!isFunction(onChange) || !Array.isArray(value)) {
        return;
      }

      const index = isString(buttonValue) ? value.indexOf(buttonValue) : -1;
      let newValue: Array<string | undefined>;

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
  const handleExclusiveChange = React.useCallback<
    (buttonValue: string | undefined) => void
  >(
    (buttonValue) => {
      if (!isFunction(onChange)) {
        return;
      }
      onChange(
        value === buttonValue && !isSelectionRequired ? undefined : buttonValue
      );
    },
    [onChange, value, isSelectionRequired]
  );

  return isExclusive ? handleExclusiveChange : handleChange;
};
