import * as React from 'react';

export interface FieldsetContextProps {
  isDisabled?: boolean;
}

export const FieldsetContext = React.createContext<FieldsetContextProps>({
  isDisabled: false,
});

export const useFieldset = (): FieldsetContextProps =>
  React.useContext(FieldsetContext);
