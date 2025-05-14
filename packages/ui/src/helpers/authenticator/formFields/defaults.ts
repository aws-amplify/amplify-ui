/**
 * This file contains helpers that generate default formFields for each screen
 */
import { getActorState } from '../actor';
import { defaultFormFieldOptions } from '../constants';
import { isAuthFieldWithDefaults } from '../form';
import type {
  FormFields,
  FormFieldOptions,
  FormFieldComponents,
  LoginMechanism,
  SignUpAttribute,
} from '../../../types';
import type {
  AuthMachineState,
  SignInState,
} from '../../../machines/authenticator/types';
import { getPrimaryAlias } from '../formFields/utils';

export const DEFAULT_COUNTRY_CODE = '+1';

/** Helper function that gets the default formField for given field name */
const getDefaultFormField = (
  fieldName: keyof typeof defaultFormFieldOptions
) => {
  let options: FormFieldOptions = defaultFormFieldOptions[fieldName];
  const { type } = options;

  if (type === 'tel') {
    options = { ...options, dialCode: DEFAULT_COUNTRY_CODE };
  }

  return options;
};

// Helper function that returns default form field for configured primary alias
export const getAliasDefaultFormField = (
  state: AuthMachineState
): FormFieldOptions => {
  const primaryAlias = getPrimaryAlias(state);
  return {
    ...getDefaultFormField(primaryAlias),
    autocomplete: 'username',
  };
};

/** Reusable confirmation code form fields. */
const getConfirmationCodeFormFields = (_: AuthMachineState): FormFields => ({
  confirmation_code: {
    ...getDefaultFormField('confirmation_code'),
    label: 'Code *',
    placeholder: 'Code',
  },
});

const getSignInFormFields = (state: AuthMachineState): FormFields => ({
  username: { ...getAliasDefaultFormField(state) },
  password: {
    ...getDefaultFormField('password'),
    autocomplete: 'current-password',
  },
});

const getSignUpFormFields = (state: AuthMachineState): FormFields => {
  const { loginMechanisms, signUpAttributes } = state.context.config as {
    loginMechanisms: LoginMechanism[];
    signUpAttributes: SignUpAttribute[];
  };
  const primaryAlias = getPrimaryAlias(state);

  /**
   * @migration signUp Fields created here
   */
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
          : getDefaultFormField(fieldName);

      formField[fieldName] = { ...fieldAttrs };
    } else {
      // There's a `custom:*` attribute or one we don't already have an implementation for
      // eslint-disable-next-line no-console
      console.debug(
        `Authenticator does not have a default implementation for ${fieldName}. Customize SignUp FormFields to add your own.`
      );
    }
  }
  return formField;
};

const getConfirmSignUpFormFields = (_: AuthMachineState): FormFields => ({
  confirmation_code: {
    ...getDefaultFormField('confirmation_code'),
    placeholder: 'Enter your code',
  },
});

const getForgotPasswordFormFields = (state: AuthMachineState): FormFields => {
  const primaryAlias = getPrimaryAlias(state);
  const { label } = defaultFormFieldOptions[primaryAlias];
  return {
    username: {
      ...getAliasDefaultFormField(state),
      label: `Enter your ${label!.toLowerCase()}`,
      placeholder: `Enter your ${label!.toLowerCase()}`,
    },
  };
};

const getConfirmResetPasswordFormFields = (
  state: AuthMachineState
): FormFields => ({
  ...getConfirmationCodeFormFields(state),
  password: {
    ...getDefaultFormField('password'),
    label: 'New Password',
    placeholder: 'New Password',
  },
  confirm_password: {
    ...getDefaultFormField('confirm_password'),
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
  },
});

const getForceNewPasswordFormFields = (state: AuthMachineState): FormFields => {
  const actorState = getActorState(state) as SignInState;
  const { missingAttributes } = actorState.context as {
    missingAttributes: SignUpAttribute[];
  };

  const fieldNames = Array.from(
    new Set([
      'password',
      'confirm_password',
      ...(missingAttributes ?? []),
    ] as const)
  );

  const formField: FormFields = {};

  for (const fieldName of fieldNames) {
    if (isAuthFieldWithDefaults(fieldName)) {
      formField[fieldName] = { ...getDefaultFormField(fieldName) };
    } else {
      // There's a `custom:*` attribute or one we don't already have an implementation for
      // eslint-disable-next-line no-console
      console.debug(
        `Authenticator does not have a default implementation for ${fieldName}. Customize ForceNewPassword FormFields to add your own.`
      );
    }
  }
  return formField;
};

const getSetupEmailFormFields = (_: AuthMachineState): FormFields => ({
  email: getDefaultFormField('email'),
});

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
  forgotPassword: getForgotPasswordFormFields,
  confirmResetPassword: getConfirmResetPasswordFormFields,
  confirmVerifyUser: getConfirmationCodeFormFields,
  setupEmail: getSetupEmailFormFields,
  setupTotp: getConfirmationCodeFormFields,
};
