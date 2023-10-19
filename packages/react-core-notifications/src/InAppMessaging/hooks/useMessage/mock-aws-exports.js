const mockawsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id: 'fake',
  aws_cognito_region: 'us-east-2',
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: {
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: [],
  aws_mobile_analytics_app_id: 'fake',
  aws_mobile_analytics_app_region: 'us-east-1',
  Analytics: {
    AWSPinpoint: {
      appId: 'fake',
      region: 'us-east-1',
    },
  },
  Notifications: {
    InAppMessaging: {
      AWSPinpoint: {
        appId: 'fake',
        region: 'us-east-1',
      },
    },
  },
};

module.exports = mockawsmobile;
