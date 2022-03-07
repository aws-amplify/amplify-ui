import React from 'react';

import { getFormFields } from '@aws-amplify/ui';

import { useAuthenticator } from '../hooks/useAuthenticator';
import { BaseFormFields } from '../shared/BaseFormFields';

export function FormFields() {
  const { _state } = useAuthenticator();

  const formFields = React.useMemo(
    () => getFormFields('forceNewPassword', _state),
    []
  );

  return (
    <>
      <BaseFormFields formFields={formFields} />
    </>
  );
}
