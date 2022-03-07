/**
 * This file contains helpers that generate default form fields, given the
 * current Authenticator / Zero Config configuration.
 */

import {
  defaultFormFieldOptions,
  getPrimaryAlias,
  isAuthFieldWithDefaults,
} from '..';
import {
  ActorContextWithForms,
  AuthMachineState,
  FormFields,
  FormField,
} from '../../../types';
import { getActorContext } from '../actor';

const getDefaultFormField = (
  state: AuthMachineState,
  attr: keyof typeof defaultFormFieldOptions
) => {
  const { country_code } = getActorContext(state) as ActorContextWithForms;
  let options: FormField = defaultFormFieldOptions[attr];
  const { type } = options;

  if (type === 'tel') {
    options = { ...options, dialCode: country_code };
  }

  return options;
};

const getAliasDefaultFormField = (state: AuthMachineState): FormField => {
  const primaryAlias = getPrimaryAlias(state);
  return {
    ...getDefaultFormField(state, primaryAlias),
    autocomplete: 'username',
  };
};

export const getSignInFormFields = (state: AuthMachineState): FormFields => {
  const alias = getPrimaryAlias(state);

  return {
    username: { ...getAliasDefaultFormField(state) },
    password: { ...getDefaultFormField(state, 'password') },
  };
};

export const getSignUpFormFields = (state: AuthMachineState): FormFields => {
  const { loginMechanisms, signUpAttributes } = state.context.config;
  const primaryAlias = getPrimaryAlias(state);

  const fieldNames = Array.from(
    new Set([
      ...loginMechanisms,
      ...signUpAttributes,
      'password',
      'confirm_password',
    ] as const)
  );

  const formField: FormFields = {};

  for (const fieldName of fieldNames) {
    if (isAuthFieldWithDefaults(fieldName)) {
      const fieldAttrs =
        fieldName === primaryAlias
          ? getAliasDefaultFormField(state)
          : getDefaultFormField(state, fieldName);

      formField[fieldName] = { ...fieldAttrs };
    } else {
      // There's a `custom:*` attribute or one we don't already have an implementation for
      console.debug(
        `Authenticator does not have a default implementation for ${fieldName}. Customize Authenticator.SignUp.FormFields to add your own.`
      );
    }
  }
  return formField;
};

export const formFieldsGetters = {
  signIn: getSignInFormFields,
  signUp: getSignUpFormFields,
};
