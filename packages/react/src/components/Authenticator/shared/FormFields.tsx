import * as React from 'react';

import type { FormFieldProps } from './FormField';
import { FormField } from './FormField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function FormFields(): React.JSX.Element {
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
