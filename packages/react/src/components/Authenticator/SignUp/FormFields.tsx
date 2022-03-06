import {
  getActorState,
  getDefaultFormFields,
  applyDefaults,
  sortFormfields,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { BaseFormFields } from '../shared/BaseFormFields';

export function FormFields() {
  const { _state } = useAuthenticator();

  const defaultFormFields = getDefaultFormFields('signUp', _state);

  const customFormFields =
    getActorState(_state).context?.formFields?.signUp || {};

  const formFields = applyDefaults(defaultFormFields, customFormFields);
  const sortedFormFields = sortFormfields(formFields);

  return (
    <>
      <BaseFormFields formFields={sortedFormFields} />
    </>
  );
}
