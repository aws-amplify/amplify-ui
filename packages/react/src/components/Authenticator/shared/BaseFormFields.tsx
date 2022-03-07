import * as React from 'react';

import { FormFields, sortFormfields } from '@aws-amplify/ui';
import { FormField } from './FormField';

export interface BaseFormFieldsProps {
  formFields: FormFields;
}
export function BaseFormFields({ formFields }: BaseFormFieldsProps) {
  const sortedFormFields = React.useMemo(
    () => sortFormfields(formFields),
    [formFields]
  );

  return (
    <>
      {sortedFormFields.flatMap(([name, options]) => (
        <FormField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
