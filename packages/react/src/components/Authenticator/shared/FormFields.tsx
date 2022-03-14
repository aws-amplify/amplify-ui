import * as React from 'react';

import {
  FormFieldComponents,
  getSortedFormFields,
  LoginMechanism,
} from '@aws-amplify/ui';
import { FormField } from './FormField';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { AliasToggle } from './AliasToggle';
export interface BaseFormFieldsProps {
  route: FormFieldComponents;
  /** toggle options for the primary alias (e.g. ['email', 'phone_number']) */
  toggles?: LoginMechanism[];
}
export function FormFields({ route, toggles }: BaseFormFieldsProps) {
  // we don't depend on any dynamic value
  const { _state, _send, primaryAlias } = useAuthenticator();
  const primaryAliasRef = React.useRef(primaryAlias);
  const formFieldsRef = React.useRef(getSortedFormFields(route, _state));

  /** Toggle logics */
  const hasToggle = toggles?.length > 1;

  const handleToggle = (primaryAlias: LoginMechanism) => {
    _send({
      type: 'SET_PRIMARY_ALIAS',
      data: { primaryAlias },
    });
  };

  const formFields = React.useMemo(() => {
    // only recompute formfields if primaryAlias has changed
    if (primaryAliasRef.current !== primaryAlias) {
      const newFormFields = getSortedFormFields(route, _state);

      // update refs
      primaryAliasRef.current = primaryAlias;
      formFieldsRef.current = newFormFields;

      return newFormFields;
    } else {
      return formFieldsRef.current;
    }
  }, [route, _state, primaryAlias]);

  return (
    <>
      {hasToggle && <AliasToggle toggles={toggles} onChange={handleToggle} />}
      {formFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
