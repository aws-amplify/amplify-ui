import * as React from 'react';

import { FormFields, sortFormfields } from '@aws-amplify/ui';
import { AttributeField } from './AttributeField';

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
        <AttributeField name={name} key={name} formFieldOptions={options} />
      ))}
    </>
  );
}
