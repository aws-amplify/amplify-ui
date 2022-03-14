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
  const { _state, _send } = useAuthenticator();
  // const hasFormFields = React.useRef(false);

  /** Toggle logics */
  const hasToggle = toggles?.length > 1;

  const handleToggle = (primaryAlias: LoginMechanism) => {
    _send({
      type: 'SET_PRIMARY_ALIAS',
      data: { primaryAlias },
    });
  };

  const sortedFormFields = getSortedFormFields(route, _state);

  return (
    <>
      {hasToggle && <AliasToggle toggles={toggles} onChange={handleToggle} />}
      {sortedFormFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
