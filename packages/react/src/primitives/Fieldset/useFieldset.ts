import * as React from 'react';

interface FieldsetContextType {
  isDisabled?: boolean;
}

export const FieldsetContext = React.createContext<FieldsetContextType>({
  isDisabled: false,
});
/**
 * @description Fieldsets in HTML can be disabled, which disables all child
 * fieldsets and input controls. `useFieldset` passes the disabled state down
 * via context.
 */
export const useFieldset = (): FieldsetContextType =>
  React.useContext(FieldsetContext);
