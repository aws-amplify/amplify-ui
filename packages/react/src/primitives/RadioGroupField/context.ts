import React, { useContext } from 'react';
import { LabelPositions } from '../types/field';

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
  labelPosition?: LabelPositions;
}

const defaultValue: RadioGroupContextType = { name: 'default' };

export const RadioGroupContext =
  React.createContext<RadioGroupContextType>(defaultValue);

export const useRadioGroupContext = () => {
  return useContext(RadioGroupContext);
};
