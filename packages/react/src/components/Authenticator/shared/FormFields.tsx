import * as React from 'react';

import { FormFieldComponents, getSortedFormFields } from '@aws-amplify/ui';

import { FormField } from './FormField';
import { useAuthenticator } from '../hooks/useAuthenticator';

export interface BaseFormFieldsProps {
  route: FormFieldComponents;
}
export function FormFields({ route }: BaseFormFieldsProps) {
  // we don't depend on any dynamic value
  const { _state } = useAuthenticator(() => []);
  const hasFormFields = React.useRef(false);

  const sortedFormFields = React.useMemo(() => {
    if (!hasFormFields.current) {
      return getSortedFormFields(route, _state);
    }
    hasFormFields.current = true;
  }, [route, _state]);

  return (
    <>
      {sortedFormFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
