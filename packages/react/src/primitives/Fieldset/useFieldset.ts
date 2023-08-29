import * as React from 'react';

interface FieldsetContextType {
  isDisabled?: boolean;
}

export const FieldsetContext = React.createContext<FieldsetContextType>({
  isDisabled: false,
});
/**
 * @description Fieldsets in HTML can be disabled, which disables all child
 * fieldsets and input controls. useFieldset passes the disabled state down
 * via context. We also use isNestedFieldset to determine if a fieldset is
 * nested because it should be disabled if its parent fieldset is disabled.
 */
export const useFieldset = (): FieldsetContextType =>
  React.useContext(FieldsetContext);
