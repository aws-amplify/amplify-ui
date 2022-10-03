import * as React from 'react';

import { FormFieldComponents, getSortedFormFields } from '@aws-amplify/ui';

import { FormField, FormFieldProps } from './FormField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function FormFields(): JSX.Element {
  // TODO remove _state
  const { _state, route } = useAuthenticator(({ route }) => [route]);

  const formFields = React.useRef(
    getSortedFormFields(route as FormFieldComponents, _state).flatMap(
      ([name, options], index) => (
        <FormField
          // use index for key, field order is static
          key={index}
          name={name}
          {...(options as Omit<FormFieldProps, 'name'>)}
        />
      )
    )
  ).current;

  return <>{formFields}</>;
}
