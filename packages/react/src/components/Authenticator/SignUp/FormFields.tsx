import * as React from 'react';

import { getSortedFormFields } from '@aws-amplify/ui';

import { useAuthenticator } from '../hooks/useAuthenticator';
import { BaseFormFields } from '../shared/BaseFormFields';

export function FormFields() {
  const { _state } = useAuthenticator();

  const sortedFormFields = React.useMemo(
    () => getSortedFormFields('signUp', _state),
    []
  );

  return (
    <>
      <BaseFormFields formFields={sortedFormFields} />
    </>
  );
}
