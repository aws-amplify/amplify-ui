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
  FormFields,
  FormFieldComponents,
  FormField,
} from '../../../types';
import { getActorContext } from '../actor';
import cloneDeep from 'lodash/cloneDeep';

export const applyTranslation = (formFields: FormFields): FormFields => {
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

export const getDefaultFormField = (
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

export const getSignInFormFields = (state: AuthMachineState): FormFields => {
  const alias = getPrimaryAlias(state);

  return {
    username: {
      ...getDefaultFormField(state, alias),
      autocomplete: 'username',
      order: 1,
    },
    password: {
      ...getDefaultFormField(state, 'password'),
      autocomplete: 'current-password',
      order: 2,
    },
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
      let fieldAttrs = getDefaultFormField(state, fieldName);

      if (fieldName === primaryAlias) {
        fieldAttrs = { ...fieldAttrs, autocomplete: 'username' };
      }
      formField[fieldName] = fieldAttrs;
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
): FormFields => {
  const getFormField = formFieldsGetters[component];
  const formFields: FormFields = getFormField(state);
  return applyTranslation(formFields);
};

export const applyDefaults = (
  defaultFormFields: FormFields,
  customFormFields: FormFields
) => {
  let formFields = cloneDeep(defaultFormFields);
  Object.keys(customFormFields).forEach((field) => {
    formFields[field] = { ...formFields[field], ...customFormFields[field] };
  });
  return formFields;
};

export type SortedFormFields = Array<[string, FormField]>;

export const sortFormfields = (formFields: FormFields): SortedFormFields => {
  return Object.entries(formFields)
    .sort((a, b) => {
      const orderA = a[1].order || Number.MAX_VALUE;
      const orderB = b[1].order || Number.MAX_VALUE;
      return orderA - orderB;
    })
    .filter((formFieldEntry) => formFieldEntry[1] !== undefined);
};
