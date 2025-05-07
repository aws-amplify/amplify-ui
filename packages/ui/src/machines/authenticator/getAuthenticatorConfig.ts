import type {
  LoginMechanism,
  PasswordSettings,
  SignUpAttribute,
  SocialProvider,
} from '../../types';

export interface LegacyConfig {
  aws_cognito_username_attributes?: string[];
  aws_cognito_signup_attributes?: string[];
  aws_cognito_verification_mechanisms?: string[];
  aws_cognito_social_providers?: string[];
  aws_cognito_password_protection_settings?: Record<string, any>;
}

// @todo-migration migrate config parsing here
export function getAuthenticatorConfig<T extends LegacyConfig>(
  config: T
): {
  loginMechanisms: LoginMechanism[] | undefined;
  signUpAttributes: SignUpAttribute[] | undefined;
  socialProviders: SocialProvider[] | undefined;
  passwordSettings: PasswordSettings | undefined;
} {
  /**
   * @migration `aws_cognito_username_attributes` notes:
   * - first index becomes login field/type
   */
  const loginMechanisms = config.aws_cognito_username_attributes?.map((s) =>
    s.toLowerCase()
  ) as LoginMechanism[];

  /**
   * @migration `aws_cognito_verification_mechanisms` notes:
   * - combined with `aws_cognito_signup_attributes` in default case to create `signUpAttributes`
   * - does not exist outside the noted usage
   */
  const verificationMechanisms =
    config.aws_cognito_verification_mechanisms?.map((s) =>
      s.toLowerCase()
    ) as SignUpAttribute[];

  /**
   * @migration `aws_cognito_signup_attributes` notes:
   *  - does not include 'password', 'confirm_password' be default
   *  - combined with `verificationMechanisms` in default case to create `signUpAttributes`
   */
  const signUpAttributes = Array.from(
    new Set([
      ...((config.aws_cognito_signup_attributes?.map((s) => s.toLowerCase()) ??
        []) as SignUpAttribute[]),
      ...(verificationMechanisms ?? []),
    ])
  );

  /**
   * @migration `aws_cognito_social_providers` notes:
   * - maps to `federatedProviders`
   */
  const socialProviders = config.aws_cognito_social_providers?.map((s) =>
    s.toLowerCase()
  ) as SocialProvider[];

  /**
   * @migration `aws_cognito_password_protection_settings` notes:
   * - cognito password settings
   */
  const passwordSettings =
    config.aws_cognito_password_protection_settings as PasswordSettings;

  return {
    loginMechanisms,
    passwordSettings,
    signUpAttributes,
    socialProviders,
  };
}
