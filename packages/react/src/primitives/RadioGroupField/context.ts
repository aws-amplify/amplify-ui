import React, { useContext } from 'react';

export interface RadioGroupContextType {
  name: string;
  currentValue?: string;
  size?: string;
  defaultValue?: string;
  hasError?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isGroupDisabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const defaultValue: RadioGroupContextType = { name: 'default' };

export const RadioGroupContext =
  React.createContext<RadioGroupContextType>(defaultValue);

export const useRadioGroupContext = () => {
  return useContext(RadioGroupContext);
};
