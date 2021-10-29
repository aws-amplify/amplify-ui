import * as exported from '../dist';

describe('@aws-amplify/ui-vue', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      expect(Object.keys(exported)).toMatchInlineSnapshot(`
        Array [
          "Authenticator",
          "AuthenticatorSignUpFormFields",
          "BaseCheckBox",
          "BaseTextField",
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
          "UserNameAlias",
          "VerifyUser",
          "default",
          "translations",
          "useAuthenticator",
        ]
      `);
    });
  });
});
