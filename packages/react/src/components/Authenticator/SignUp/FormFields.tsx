import {
  getActorContext,
  getActorState,
  LoginMechanism,
  SignUpContext,
  translate,
  CommonFields,
  setFormOrder,
  getSignUpFormFields,
  getDefaultFormFields,
  applyDefaults,
  sortFormfields,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PasswordField, PhoneNumberField, Text, TextField } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';
import { propsCreator, phonePropsCreator } from '../../../helpers/utils';
import React from 'react';
import { AttributeField } from '../shared/AttributeField';
import { BaseFormFields } from '../shared/BaseFormFields';

export function FormFields() {
  const { _state } = useAuthenticator();

  const defaultFormFields = getDefaultFormFields('signUp', _state);

  const customFormFields =
    getActorState(_state).context?.formFields?.signUp || {};

  const formFields = applyDefaults(defaultFormFields, customFormFields);
  // Only 1 is supported, so `['email', 'phone_number']` will only show `email`

  const sortedFormFields = sortFormfields(formFields);
  console.log(sortedFormFields);

  return (
    <>
      <BaseFormFields formFields={sortedFormFields} />
    </>
  );
}
