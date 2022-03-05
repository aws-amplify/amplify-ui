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
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PasswordField, PhoneNumberField, Text, TextField } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';
import { propsCreator, phonePropsCreator } from '../../../helpers/utils';
import React from 'react';
import { AttributeField } from '../shared/AttributeField';
import { BaseFormFields } from '../shared/BaseFormFields';

export function FormFields() {
  const { _state, updateForm, updateBlur } = useAuthenticator();
  const { country_code, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;

  const defaultFormFields = getDefaultFormFields('signUp', _state);

  const [order, setOrder] = React.useState([]);

  const fieldNames = Array.from(
    new Set([...loginMechanisms, ...signUpAttributes])
  );

  const formOverrides = getActorState(_state).context?.formFields?.signUp;

  // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
  const loginMechanism = fieldNames.shift() as LoginMechanism | CommonFields;

  const userOverrides = formOverrides?.[loginMechanism];
  const common = [
    loginMechanism,
    'password',
    'confirm_password',
  ] as CommonFields[];

  React.useEffect(() => {
    const fieldNamesCombined = [...common, ...fieldNames];
    setOrder(setFormOrder(formOverrides, fieldNamesCombined));
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <>
      <BaseFormFields formFields={defaultFormFields} />
    </>
  );
}
