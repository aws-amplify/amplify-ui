import { isNaN } from 'lodash';
import * as React from 'react';

import { StepperFieldProps } from '../types/stepperField';
import { isControlledComponent, isFunction } from '../shared/utils';

export const useStepper = ({
  defaultValue = 0,
  value,
  step = 1,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  isDisabled,
  isReadOnly,
  onDecrease,
  onIncrease,
  onStepChange,
}: StepperFieldProps) => {
  // Make sure max value is greater than or equal to min value
  max = Math.max(min, max);

  // Maintain an internal state for uncontrolled components
  // This allows to take over the input value and correct any invalid versus purely relying on the native uncontrolled input
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const isControlled = isControlledComponent(value);
  value = isControlled ? value : uncontrolledValue;

  // This is the exact value to be rendered on screen
  // It could be a string, like '-' and empty string when users clear the input value
  const [inputValue, setInputValue] = React.useState<number | string>(value);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        let newValue = parseFloat(event.target.value);
        // Though input[type='number'] has built-in validation to reject non-numerical entries
        // The entered value could still be empty string or minus '-'
        if (isNaN(newValue)) {
          setInputValue(event.target.value);
          return;
        }

        // // Make sure new value is not outside the bound
        newValue = Math.min(newValue, max);
        newValue = Math.max(newValue, min);

        // // Round it to the closest step value
        const remainder = (newValue - min) % step;
        newValue = newValue - remainder + Math.round(remainder / step) * step;

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }

        if (isFunction(onStepChange)) {
          onStepChange(newValue);
        }

        setInputValue(newValue);
      },
      [min, max, step, isControlled, onStepChange]
    );

  const handleIncrease: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      // No need to check if the value will be outside the bounds because the button will be disabled if so
      if (!isControlled) {
        setUncontrolledValue(value + step);
      }

      if (isFunction(onStepChange)) {
        onStepChange(value + step);
      }

      if (isFunction(onIncrease)) {
        onIncrease();
      }
      setInputValue(value + step);
    }, [step, value, isControlled, onIncrease, onStepChange]);

  const handleDecrease: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      // No need to check if the value will be outside the bounds because the button will be disabled if so
      if (!isControlled) {
        setUncontrolledValue(value - step);
      }

      if (isFunction(onStepChange)) {
        onStepChange(value - step);
      }

      if (isFunction(onDecrease)) {
        onDecrease();
      }
      setInputValue(value - step);
    }, [step, value, isControlled, onDecrease, onStepChange]);

  // This aims to disable unwanted behaviors on input[type='number']
  // When the input gets focused, rotating a wheel will change the value
  // but the parent container(the entire window mostly) is scrolling to elsewhere
  const handleOnWheel: React.WheelEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      event.currentTarget.blur();
    }, []);

  const shouldDisableIncreaseButton =
    isDisabled || isReadOnly || value + step > max;

  const shouldDisableDecreaseButton =
    isDisabled || isReadOnly || value - step < min;

  return {
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnChange,
    handleOnWheel,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  };
};
