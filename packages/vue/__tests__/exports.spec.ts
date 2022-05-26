import * as exported from '../dist';

describe('@aws-amplify/ui-vue', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      expect(Object.keys(exported)).toMatchInlineSnapshot(`
        Array [
          "AmplifyButton",
          "AmplifyCheckBox",
          "AmplifyTextField",
          "Authenticator",
          "AuthenticatorForceNewPasswordFormFields",
          "AuthenticatorSignUpFormFields",
          "ConfirmResetPassword",
          "ConfirmSignIn",
          "ConfirmSignUp",
          "ConfirmVerifyUser",
          "FederatedSignIn",
          "ForceNewPassword",
          "PasswordControl",
          "RenderInfo",
          "ResetPassword",
          "SignIn",
          "SignUp",
          "VerifyUser",
          "default",
          "translations",
          "useAuthenticator",
        ]
      `);
    });
  });
});
