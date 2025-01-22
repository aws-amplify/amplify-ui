import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { SES_EMAIL } from './constants';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
});
const { cfnResources, userPool } = backend.auth.resources;

const { stack } = userPool;

const { cfnUserPool, cfnUserPoolClient } = cfnResources;

cfnUserPool.usernameAttributes = [];
cfnUserPool.emailConfiguration = {
  emailSendingAccount: 'DEVELOPER',
  from: SES_EMAIL,
  sourceArn: `arn:aws:ses:${stack.region}:${stack.account}:identity/${SES_EMAIL}`,
};
cfnUserPool.schema = [
  {
    attributeDataType: 'String',
    name: 'nickname',
  },
];

cfnUserPool.smsConfiguration = undefined;
cfnUserPool.userPoolTier = 'PLUS';
cfnUserPool.mfaConfiguration = 'ON';
cfnUserPool.enabledMfas = ['EMAIL_OTP', 'SOFTWARE_TOKEN_MFA'];
cfnUserPoolClient.explicitAuthFlows = [
  'ALLOW_REFRESH_TOKEN_AUTH',
  'ALLOW_USER_SRP_AUTH',
];
