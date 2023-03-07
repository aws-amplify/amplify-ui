import * as React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { StepperFieldProps } from '../types/stepperField';

type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;
type FocusHandler = React.FocusEventHandler<HTMLInputElement>;
type WheelHandler = React.WheelEventHandler<HTMLInputElement>;

type InputValue = number | string;

interface UseStepper
  extends Required<Pick<StepperFieldProps, 'step' | 'value'>> {
  inputValue: InputValue;
  handleDecrease: ClickHandler;
  handleIncrease: ClickHandler;
  handleOnBlur: FocusHandler;
  handleOnChange: ChangeHandler;
  handleOnWheel: WheelHandler;
  setInputValue: React.Dispatch<React.SetStateAction<InputValue>>;
  shouldDisableDecreaseButton: boolean;
  shouldDisableIncreaseButton: boolean;
}

const getCorrectSteppingValue = ({
  max,
  min,
  step,
  value,
}: {
  max: number;
  min: number;
  step: number;
  value: number;
}) => {
  // Round it to the closest step value
  // It will be based off min to be consistent with native input[type="number"]
  // This allows keyboard accessible
  const remainder = (value - min) % step;
  value = value - remainder + Math.round(remainder / step) * step;

  // Make sure new value is not outside the bound
  value = Math.max(min, value);
  if (value > max) {
    value = max - ((max - min) % step);
  }

  return value;
};

export const useStepper = ({
  defaultValue = 0,
  value: controlledValue,
  step = 1,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  isDisabled,
  isReadOnly,
  onChange,
  onDecrease,
  onIncrease,
  onStepChange,
}: StepperFieldProps & { onChange?: ChangeHandler }): UseStepper => {
  const isControlled = controlledValue !== undefined;

  // Make sure max value is greater than or equal to min value
  max = Math.max(min, max);

  // Maintain an internal state for uncontrolled components
  // This allows to take over the input value and correct any invalid versus purely relying on the native uncontrolled input
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    // This is required for users could provide any defaultValue
    getCorrectSteppingValue({ min, max, step, value: defaultValue })
  );

  // Same for controlled components on the first render because users could provide invalid initial value.
  // It seems redundant afterwards but necessary for the first render
  const value = isControlled
    ? getCorrectSteppingValue({ min, max, step, value: controlledValue })
    : uncontrolledValue;

  const shouldDisableIncreaseButton =
    isDisabled || isReadOnly || value + step > max;

  const shouldDisableDecreaseButton =
    isDisabled || isReadOnly || value - step < min;

  // This is the exact value to be rendered on screen
  // It could be a string, like '-' or empty string when users clear the input
  const [inputValue, setInputValue] = React.useState<InputValue>(value);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setInputValue(event.target.value);

        if (isFunction(onChange)) {
          onChange(event);
        }
      },
      [onChange]
    );

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        const parsedValue = parseFloat(event.target.value);
        // Though input[type='number'] has built-in validation to reject non-numerical entries
        // The entered value could still be empty string or minus '-'
        // in these cases, no need to do the following validation
        if (isNaN(parsedValue)) {
          return;
        }

        const newValue = getCorrectSteppingValue({
          min,
          max,
          step,
          value: parsedValue,
        });

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
      // No need to check if the value will be outside the bounds
      // The button will be disabled if so
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
      // No need to check if the value will be outside the bounds
      // The button will be disabled if so
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

  // This aims to disable unwanted behaviors on React input[type='number']
  // When the input gets focused, rotating a wheel will change its value
  // But the parent container(mostly the entire window) will be scrolling to elsewhere
  const handleOnWheel: React.WheelEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      event.currentTarget.blur();
    }, []);

  return {
    step,
    value,
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnBlur,
    handleOnChange,
    handleOnWheel,
    setInputValue,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  };
};
