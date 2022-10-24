import * as React from 'react';

import { FormField, FormFieldProps } from './FormField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function FormFields(): JSX.Element {
  const { fields } = useAuthenticator(({ route }) => [route]);

  const formFields = React.useRef(
    fields.map((field, index) => (
      <FormField
        // use index for key, field order is static
        key={index}
        {...(field as FormFieldProps)}
      />
    ))
  ).current;

  return <>{formFields}</>;
}
