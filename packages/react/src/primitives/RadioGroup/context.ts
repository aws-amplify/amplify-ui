import React, { useContext } from 'react';

export interface RadioGroupContextType {
  name: string;
  currentValue?: string;
  size?: string;
  defaultValue?: string;
  hasError?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isGroupDisabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroupContext =
  React.createContext<RadioGroupContextType>(null);

export const useRadioGroupContext = (): RadioGroupContextType => {
  return useContext(RadioGroupContext);
};
