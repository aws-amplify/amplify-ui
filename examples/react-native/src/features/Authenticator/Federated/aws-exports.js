import awsExports from '@aws-amplify/ui-environments/auth/auth-with-federated/src/aws-exports';

export default {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: 'myapp://ui/components/authenticator/sign-in-federated/',
    redirectSignOut: 'myapp://ui/components/authenticator/sign-in-federated/',
  },
};
