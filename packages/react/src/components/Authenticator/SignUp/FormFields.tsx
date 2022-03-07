import React from 'react';

import { sortFormfields } from '@aws-amplify/ui';

import { useAuthenticator } from '../hooks/useAuthenticator';
import { BaseFormFields } from '../shared/BaseFormFields';
import { getFormFields } from '../../../helpers';

export function FormFields() {
  const { _state } = useAuthenticator();

  const formFields = React.useMemo(() => getFormFields('signUp', _state), []);
  const sortedFormFields = sortFormfields(formFields);

  return (
    <>
      <BaseFormFields formFields={sortedFormFields} />
    </>
  );
}
