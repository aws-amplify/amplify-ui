/* eslint-disable */

const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id: 'us-east-2:adsf',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_asdf',
  aws_user_pools_web_client_id: 'asdf',
  oauth: {},
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_mobile_analytics_app_id: 'asdf',
  aws_mobile_analytics_app_region: 'us-east-1',
  Analytics: {
    AWSPinpoint: {
      appId: 'asdf',
      region: 'us-east-1',
    },
  },
  Notifications: {
    InAppMessaging: {
      AWSPinpoint: {
        appId: 'asdf',
        region: 'us-east-1',
      },
    },
  },
};

export default awsmobile;
