/**
 * This file contains helpers that generate default form fields, given the
 * current Authenticator / Zero Config configuration.
 */

import { translate } from '../../../i18n/translations';
import {
  defaultFormFieldOptions,
  getPrimaryAlias,
  isAuthFieldWithDefaults,
} from '..';
import {
  ActorContextWithForms,
  AuthFieldsWithDefaults,
  AuthMachineState,
  FormField,
  FormFieldOptions,
} from '../../../types';
import { getActorContext } from '../actor';

export const applyTranslation = (
  formFieldOptions: FormFieldOptions
): FormFieldOptions => {
  const { label, placeholder } = formFieldOptions;
  return {
    ...formFieldOptions,
    label: label ? translate<string>(label) : undefined,
    placeholder: placeholder ? translate<string>(placeholder) : undefined,
  };
};

export const getFormFieldOptions = (
  state: AuthMachineState,
  attr: keyof typeof defaultFormFieldOptions
) => {
  const { country_code } = getActorContext(state) as ActorContextWithForms;
  let options: FormFieldOptions = defaultFormFieldOptions[attr];
  const { type } = options;

  if (type === 'tel') {
    options = { ...options, dialCode: country_code };
  }

  return applyTranslation(options);
};

export const getPrimaryAliasFieldOptions = (
  state: AuthMachineState
): FormFieldOptions => {
  const primaryAlias = getPrimaryAlias(state);

  return getFormFieldOptions(state, primaryAlias);
};

export const getSignInFormFields = (state: AuthMachineState): FormField => {
  const alias = getPrimaryAlias(state);
  return {
    username: { ...getFormFieldOptions(state, alias), order: 1 },
    password: { ...getFormFieldOptions(state, 'password'), order: 2 },
  };
};

export const getSignUpFormFields = (state: AuthMachineState): FormField => {
  const { loginMechanisms, signUpAttributes } = state.context.config;

  const fieldNames = Array.from(
    new Set([
      ...loginMechanisms,
      ...signUpAttributes,
      'password',
      'confirm_password',
    ] as const)
  );

  const formField: FormField = {};

  for (const fieldName of fieldNames) {
    if (isAuthFieldWithDefaults(fieldName)) {
      formField[fieldName] = getFormFieldOptions(state, fieldName);
    } else {
      // There's a `custom:*` attribute or one we don't already have an implementation for
      console.debug(
        `Authenticator does not have a default implementation for ${fieldName}. Customize Authenticator.SignUp.FormFields to add your own.`
      );
    }
  }
  return formField;
};
