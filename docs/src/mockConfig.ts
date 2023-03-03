/**
 * This is a fake Amplify Config file so that we don't show
 * errors in the console for using the Authenticator.
 */
export const mockConfig = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id: 'mock',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_mock',
  aws_user_pools_web_client_id: 'mock',
  oauth: {},
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      'REQUIRES_LOWERCASE',
      'REQUIRES_NUMBERS',
      'REQUIRES_SYMBOLS',
      'REQUIRES_UPPERCASE',
    ],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
};
