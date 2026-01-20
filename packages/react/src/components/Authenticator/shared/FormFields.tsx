import * as React from 'react';

import type { FormFieldProps } from './FormField';
import { FormField } from './FormField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function FormFields({
  includePassword,
}: { includePassword?: boolean } = {}): React.JSX.Element {
  const { fields } = useAuthenticator(({ route }) => [route]);
  const { selectedAuthMethod, preferredChallenge } = useAuthenticator(
    (context) => [context.selectedAuthMethod, context.preferredChallenge]
  );

  // Determine if password should be shown
  const effectiveMethod = selectedAuthMethod ?? preferredChallenge;
  const shouldShowPassword =
    includePassword ?? (!effectiveMethod || effectiveMethod === 'PASSWORD');

  const formFields = React.useRef(
    fields
      .map((field, index) => {
        // Make password and confirm_password optional for passwordless methods
        if (
          (field.name === 'password' || field.name === 'confirm_password') &&
          !shouldShowPassword
        ) {
          return (
            <FormField
              key={index}
              {...(field as FormFieldProps)}
              isRequired={false}
            />
          );
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
