import * as React from 'react';

import { FormFieldComponents, getSortedFormFields } from '@aws-amplify/ui';
import { FormField } from './FormField';
import { useAuthenticator } from '../hooks/useAuthenticator';

export interface BaseFormFieldsProps {
  route: FormFieldComponents;
}
export function BaseFormFields({ route }: BaseFormFieldsProps) {
  // we don't depend on any dynamic value
  const { _state } = useAuthenticator(() => []);
  const sortedFormFields = React.useMemo(
    () => getSortedFormFields(route, _state),
    []
  );

  return (
    <>
      {sortedFormFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
