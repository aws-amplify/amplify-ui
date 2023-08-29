import * as React from 'react';

interface FieldsetContextType {
  isFieldsetDisabled?: boolean;
}

export const FieldsetContext = React.createContext<FieldsetContextType>({
  isFieldsetDisabled: false,
});
/**
 * @description Fieldsets in HTML can be disabled, which disables all child
 * fieldsets and input controls. `useFieldset` passes the disabled state down
 * via context.
 */
export const useFieldset = (): FieldsetContextType =>
  React.useContext(FieldsetContext);
