import * as React from 'react';

export interface FieldsetContextProps {
  isNestedFieldset: boolean;
  isDisabled?: boolean;
}

export const FieldsetContext = React.createContext<FieldsetContextProps>({
  isNestedFieldset: false,
  isDisabled: false,
});

export const useFieldset = (): FieldsetContextProps =>
  React.useContext(FieldsetContext);
