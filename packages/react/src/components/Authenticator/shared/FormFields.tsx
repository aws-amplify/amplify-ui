import * as React from 'react';

import type { FormFieldProps } from './FormField';
import { FormField } from './FormField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function FormFields(): React.JSX.Element {
  const { fields } = useAuthenticator(({ route }) => [route]);
  const availableAuthMethods = useAuthenticator((context) => [
    context.availableAuthMethods,
  ])[0] as string[] | undefined;

  const formFields = React.useRef(
    fields
      .map((field, index) => {
        // Hide password field if multiple auth methods are available (passwordless flow)
        if (
          field.name === 'password' &&
          availableAuthMethods &&
          availableAuthMethods.length > 1
        ) {
          return null;
        }
        return (
          <FormField
            // use index for key, field order is static
            key={index}
            {...(field as FormFieldProps)}
          />
        );
      })
      .filter(Boolean)
  ).current;

  return <>{formFields}</>;
}
