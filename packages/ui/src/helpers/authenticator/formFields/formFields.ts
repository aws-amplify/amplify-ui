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
  FormFieldComponents,
  SignInState,
  SignInContext,
} from '../../../types';
import { getActorContext, getActorState } from '../actor';
import { applyDefaults, applyTranslation } from './util';

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

const getSignInFormFields = (state: AuthMachineState): FormFields => ({
  username: { ...getAliasDefaultFormField(state) },
  password: {
    ...getDefaultFormField(state, 'password'),
    autocomplete: 'current-password',
  },
});

const getSignUpFormFields = (state: AuthMachineState): FormFields => {
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
        `Authenticator does not have a default implementation for ${fieldName}. Customize SignUp FormFields to add your own.`
      );
    }
  }
  return formField;
};

const getConfirmSignUpFormFields = (state: AuthMachineState): FormFields => ({
  confirmation_code: {
    ...getDefaultFormField(state, 'confirmation_code'),
    placeholder: 'Enter your code',
  },
});

// Reusable form fields that only has confirmation_code field.
const getConfirmationCodeFormFields = (
  state: AuthMachineState
): FormFields => ({
  confirmation_code: {
    ...getDefaultFormField(state, 'confirmation_code'),
    label: 'Code *',
    placeholder: 'Code',
  },
});

const getConfirmResetPasswordFormFields = (
  state: AuthMachineState
): FormFields => ({
  ...getConfirmationCodeFormFields(state),
  password: {
    ...getDefaultFormField(state, 'password'),
    label: 'New Password',
    placeholder: 'New Password',
  },
  confirm_password: {
    ...getDefaultFormField(state, 'confirm_password'),
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
  },
});

const getResetPasswordFormFields = (state: AuthMachineState): FormFields => ({
  username: {
    ...getAliasDefaultFormField(state),
    label: 'Enter your username',
    placeholder: 'Enter your username',
  },
});

const getForceNewPasswordFormFields = (state: AuthMachineState): FormFields => {
  const actorState = getActorState(state) as SignInState;
  const { requiredAttributes } = actorState.context as SignInContext;

  const fieldNames = Array.from(
    new Set(['password', 'confirm_password', ...requiredAttributes] as const)
  );

  const formField: FormFields = {};

  for (const fieldName of fieldNames) {
    if (isAuthFieldWithDefaults(fieldName)) {
      formField[fieldName] = { ...getDefaultFormField(state, fieldName) };
    } else {
      // There's a `custom:*` attribute or one we don't already have an implementation for
      console.debug(
        `Authenticator does not have a default implementation for ${fieldName}. Customize ForceNewPassword FormFields to add your own.`
      );
    }
  }
  return formField;
};

export const formFieldsGetters: Record<
  FormFieldComponents,
  (state: AuthMachineState) => FormFields
> = {
  signIn: getSignInFormFields,
  signUp: getSignUpFormFields,
  confirmSignUp: getConfirmSignUpFormFields,
  confirmSignIn: getConfirmationCodeFormFields,
  forceNewPassword: getForceNewPasswordFormFields,
  resetPassword: getResetPasswordFormFields,
  confirmResetPassword: getConfirmResetPasswordFormFields,
  confirmVerifyUser: getConfirmationCodeFormFields,
  setupTOTP: getConfirmationCodeFormFields,
};

export const getDefaultFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const getFormFields = formFieldsGetters[component];
  const formFields: FormFields = getFormFields(state);
  return applyTranslation(formFields);
};

export const getFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const defaultFormFields = getDefaultFormFields(component, state);
  const customFormFields =
    getActorState(state).context?.formFields?.[component] || {};
  const formFields = applyDefaults(defaultFormFields, customFormFields);
  return formFields;
};
