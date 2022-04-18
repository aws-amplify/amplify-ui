/**
 * This file contains helpers that generate default formFields for each screen
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
  FormFieldOptions,
  FormFieldComponents,
  SignInState,
  SignInContext,
} from '../../../types';
import { getActorContext, getActorState } from '../actor';

/** Helper function that gets the default formField for given field name */
const getDefaultFormField = (
  state: AuthMachineState,
  fieldName: keyof typeof defaultFormFieldOptions
) => {
  const { country_code } = getActorContext(state) as ActorContextWithForms;
  let options: FormFieldOptions = defaultFormFieldOptions[fieldName];
  const { type } = options;

  if (type === 'tel') {
    options = { ...options, dialCode: country_code };
  }

  return options;
};

/** Helper function that returns default form field for configured primary alias */
const getAliasDefaultFormField = (
  state: AuthMachineState
): FormFieldOptions => {
  const primaryAlias = getPrimaryAlias(state);
  return {
    ...getDefaultFormField(state, primaryAlias),
    autocomplete: 'username',
  };
};

/** Reusable confirmation code form fields. */
const getConfirmationCodeFormFields = (
  state: AuthMachineState
): FormFields => ({
  confirmation_code: {
    ...getDefaultFormField(state, 'confirmation_code'),
    label: 'Code *',
    placeholder: 'Code',
  },
});

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
      'password',
      'confirm_password',
      ...signUpAttributes,
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

const getResetPasswordFormFields = (state: AuthMachineState): FormFields => {
  const primaryAlias = getPrimaryAlias(state);
  const { label } = defaultFormFieldOptions[primaryAlias];
  return {
    username: {
      ...getAliasDefaultFormField(state),
      label: `Enter your ${label.toLowerCase()}`,
      placeholder: `Enter your ${label.toLowerCase()}`,
    },
  };
};

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

/** Collect all the defaultFormFields getters */
export const defaultFormFieldsGetters: Record<
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
