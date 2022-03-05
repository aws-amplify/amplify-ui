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
  AuthMachineState,
  FormField,
  FormFieldComponents,
  FormFieldOptions,
} from '../../../types';
import { getActorContext } from '../actor';

export const applyTranslation = (formFields: FormField): FormField => {
  const newFormFields = { ...formFields };
  for (const [name, options] of Object.entries(formFields)) {
    const { label, placeholder } = options;

    newFormFields[name] = {
      ...options,
      label: label ? translate<string>(label) : undefined,
      placeholder: placeholder ? translate<string>(placeholder) : undefined,
    };
  }
  return newFormFields;
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

  return options;
};

export const getSignInFormFields = (state: AuthMachineState): FormField => {
  const alias = getPrimaryAlias(state);
  return {
    username: {
      ...getFormFieldOptions(state, alias),
      order: 1,
    },
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

const formFieldsGetters = {
  signIn: getSignInFormFields,
  signUp: getSignUpFormFields,
};

export const getDefaultFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormField => {
  const getFormField = formFieldsGetters[component];
  const formFields: FormField = getFormField(state);
  return applyTranslation(formFields);
};
