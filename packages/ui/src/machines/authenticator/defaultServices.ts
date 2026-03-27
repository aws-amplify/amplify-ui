import type { ResourcesConfig } from 'aws-amplify';
import type { AmplifyContext } from 'aws-amplify';
import type { UserAttributeKey } from 'aws-amplify/auth';

import {
  confirmResetPassword,
  confirmSignIn,
  confirmSignUp,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  signIn,
  signUp,
} from 'aws-amplify/auth';
import { hasSpecialChars } from '../../helpers';

import type {
  AuthFormData,
  AuthTouchData,
  LoginMechanism,
  PasswordSettings,
  SocialProvider,
  ValidatorResult,
} from '../../types';

// Cognito does not allow a password length less then 8 characters
const DEFAULT_COGNITO_PASSWORD_MIN_LENGTH = 8;

type UserAttributes = ResourcesConfig['Auth']['Cognito']['userAttributes'];
type InvalidUserAttributes =
  ResourcesConfig['Auth']['Cognito']['userAttributes'][];

const isInvalidUserAtributes = (
  userAttributes: UserAttributes | InvalidUserAttributes
): userAttributes is InvalidUserAttributes => Array.isArray(userAttributes);

const parseUserAttributes = (
  userAttributes: UserAttributes | InvalidUserAttributes
): UserAttributeKey[] => {
  if (!userAttributes) {
    return undefined;
  }

  // `aws-amplify` versions <= 6.0.5 return an array of `userAttributes` rather than an object
  if (isInvalidUserAtributes(userAttributes)) {
    return Object.entries(userAttributes).map(
      ([_, value]) => Object.keys(value)[0]
    );
  }

  return Object.keys(userAttributes);
};

/**
 * Creates default services bound to the given AmplifyContext.
 * All auth API calls are pre-bound so actors can call them
 * without needing to pass the context explicitly.
 */
export function createDefaultServices(ctx: AmplifyContext) {
  return {
    async getAmplifyConfig() {
      const result = ctx.resourcesConfig;

      const cliConfig = result.Auth?.Cognito;
      const { loginWith, userAttributes } = result.Auth?.Cognito ?? {};

      const parsedLoginMechanisms = loginWith
        ? (Object.entries(loginWith)
            .filter(([key, _value]) => key !== 'oauth')
            .filter(([_key, value]) => !!value)
            .map((keyValueArray) => {
              return keyValueArray[0] === 'phone' // the key for phone_number is phone in getConfig but everywhere else we treat is as phone_number
                ? 'phone_number'
                : keyValueArray[0];
            }) as LoginMechanism[])
        : undefined;

      const parsedSignupAttributes = parseUserAttributes(userAttributes);

      const parsedSocialProviders = loginWith?.oauth?.providers
        ? (loginWith.oauth.providers?.map((provider) =>
            provider.toString().toLowerCase()
          ) as SocialProvider[])
        : undefined;

      // Detect passwordless capabilities from amplify_outputs.json
      // Support both snake_case (legacy) and camelCase (current) formats
      const passwordlessConfig = (result.Auth?.Cognito as any)?.passwordless;
      const passwordlessCapabilities = {
        emailOtpEnabled:
          passwordlessConfig?.emailOtpEnabled ??
          passwordlessConfig?.email_otp_enabled === true,
        smsOtpEnabled:
          passwordlessConfig?.smsOtpEnabled ??
          passwordlessConfig?.sms_otp_enabled === true,
        webAuthnEnabled: !!(
          passwordlessConfig?.webAuthn ?? passwordlessConfig?.web_authn
        ),
        preferredChallenge:
          passwordlessConfig?.preferredChallenge ??
          passwordlessConfig?.preferred_challenge,
      };

      return {
        ...cliConfig,
        loginMechanisms: parsedLoginMechanisms,
        signUpAttributes: parsedSignupAttributes,
        socialProviders: parsedSocialProviders,
        passwordlessCapabilities,
      };
    },
    getCurrentUser: () => getCurrentUser(ctx),
    handleSignIn: (input: Parameters<typeof signIn>[1]) => signIn(ctx, input),
    handleSignUp: (input: Parameters<typeof signUp>[1]) => signUp(ctx, input),
    handleConfirmSignIn: (input: Parameters<typeof confirmSignIn>[1]) =>
      confirmSignIn(ctx, input),
    handleConfirmSignUp: (input: Parameters<typeof confirmSignUp>[1]) =>
      confirmSignUp(ctx, input),
    handleForgotPasswordSubmit: (
      input: Parameters<typeof confirmResetPassword>[1]
    ) => confirmResetPassword(ctx, input),
    handleForgotPassword: (input: Parameters<typeof resetPassword>[1]) =>
      resetPassword(ctx, input),
    handleResendSignUpCode: (input: Parameters<typeof resendSignUpCode>[1]) =>
      resendSignUpCode(ctx, input),

    // Validation hooks for overriding
    async validateCustomSignUp(
      _: AuthFormData,
      __: AuthTouchData
    ): Promise<ValidatorResult> {},
    async validateFormPassword(
      formData: AuthFormData,
      touchData: AuthTouchData,
      passwordSettings: PasswordSettings
    ): Promise<ValidatorResult> {
      const { password } = formData;

      const { password: touched_password } = touchData;

      if (!touched_password || !passwordSettings) return null;

      const password_complexity = [];

      const policyMinLength =
        passwordSettings.minLength ?? DEFAULT_COGNITO_PASSWORD_MIN_LENGTH;
      if (password.length < policyMinLength) {
        password_complexity.push(
          `Password must have at least ${policyMinLength} characters`
        );
      }

      if (passwordSettings.requireLowercase && !/[a-z]/.test(password))
        password_complexity.push('Password must have lower case letters');

      if (passwordSettings.requireUppercase && !/[A-Z]/.test(password))
        password_complexity.push('Password must have upper case letters');

      if (passwordSettings.requireNumbers && !/[0-9]/.test(password))
        password_complexity.push('Password must have numbers');

      if (
        passwordSettings.requireSpecialCharacters &&
        !hasSpecialChars(password)
      )
        password_complexity.push('Password must have special characters');

      return password_complexity.length !== 0
        ? { password: password_complexity }
        : null;
    },
    async validateConfirmPassword(
      formData: AuthFormData,
      touchData: AuthTouchData
    ): Promise<ValidatorResult> {
      const { password, confirm_password } = formData;

      const {
        confirm_password: touched_confirm_password,
        password: touched_password,
      } = touchData;

      if (!password && !confirm_password) {
        return null;
      } else if (
        (password || confirm_password) &&
        password !== confirm_password &&
        ((touched_confirm_password && touched_password) ||
          (password?.length >= 6 && confirm_password?.length >= 6))
      ) {
        return {
          confirm_password: 'Your passwords must match',
        };
      }
    },
    async validatePreferredUsername(
      _: AuthFormData,
      __: AuthTouchData
    ): Promise<ValidatorResult> {},
    async validateRequiredFieldsForAuthMethod(
      formData: AuthFormData
    ): Promise<ValidatorResult> {
      const authMethod = formData.__authMethod;

      if (!authMethod) return null;

      if (authMethod === 'EMAIL_OTP' && !formData.email) {
        return { email: 'Email is required for Email OTP sign up' };
      }

      if (authMethod === 'SMS_OTP' && !formData.phone_number) {
        return {
          phone_number: 'Phone number is required for SMS OTP sign up',
        };
      }

      if (authMethod === 'PASSWORD') {
        const errors: Record<string, string> = {};

        if (!formData.password) {
          errors.password = 'Password is required';
        }

        if (!formData.confirm_password) {
          errors.confirm_password = 'Confirm Password is required';
        }

        return Object.keys(errors).length > 0 ? errors : null;
      }

      return null;
    },
  };
}

export type DefaultServices = ReturnType<typeof createDefaultServices>;

export { validateFormPassword, validateConfirmPassword };

async function validateFormPassword(
  formData: AuthFormData,
  touchData: AuthTouchData,
  passwordSettings: PasswordSettings
): Promise<ValidatorResult> {
  const { password } = formData;
  const { password: touched_password } = touchData;

  if (!touched_password || !passwordSettings) return null;

  const password_complexity = [];

  const policyMinLength =
    passwordSettings.minLength ?? DEFAULT_COGNITO_PASSWORD_MIN_LENGTH;
  if (password.length < policyMinLength) {
    password_complexity.push(
      `Password must have at least ${policyMinLength} characters`
    );
  }

  if (passwordSettings.requireLowercase && !/[a-z]/.test(password))
    password_complexity.push('Password must have lower case letters');

  if (passwordSettings.requireUppercase && !/[A-Z]/.test(password))
    password_complexity.push('Password must have upper case letters');

  if (passwordSettings.requireNumbers && !/[0-9]/.test(password))
    password_complexity.push('Password must have numbers');

  if (passwordSettings.requireSpecialCharacters && !hasSpecialChars(password))
    password_complexity.push('Password must have special characters');

  return password_complexity.length !== 0
    ? { password: password_complexity }
    : null;
}

async function validateConfirmPassword(
  formData: AuthFormData,
  touchData: AuthTouchData
): Promise<ValidatorResult> {
  const { password, confirm_password } = formData;

  const {
    confirm_password: touched_confirm_password,
    password: touched_password,
  } = touchData;

  if (!password && !confirm_password) {
    return null;
  } else if (
    (password || confirm_password) &&
    password !== confirm_password &&
    ((touched_confirm_password && touched_password) ||
      (password?.length >= 6 && confirm_password?.length >= 6))
  ) {
    return {
      confirm_password: 'Your passwords must match',
    };
  }
}


