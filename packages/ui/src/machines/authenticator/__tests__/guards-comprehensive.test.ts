import guards from '../guards';
import type { AuthActorContext } from '../types';

describe('Guards', () => {
  describe('Response next step guards', () => {
    it('shouldConfirmSignInWithNewPassword returns true for NEW_PASSWORD_REQUIRED', () => {
      const event = {
        type: 'done.invoke',
        data: {
          nextStep: {
            signInStep: 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED',
          },
        },
      } as any;
      expect(
        guards.shouldConfirmSignInWithNewPassword(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(true);
    });

    it('shouldConfirmSignInWithNewPassword returns false for other steps', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signInStep: 'DONE' } },
      } as any;
      expect(
        guards.shouldConfirmSignInWithNewPassword(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(false);
    });

    it('shouldResetPasswordFromSignIn returns true for RESET_PASSWORD', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signInStep: 'RESET_PASSWORD' } },
      } as any;
      expect(
        guards.shouldResetPasswordFromSignIn(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(true);
    });

    it('shouldConfirmSignUpFromSignIn returns true for CONFIRM_SIGN_UP', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signInStep: 'CONFIRM_SIGN_UP' } },
      } as any;
      expect(
        guards.shouldConfirmSignUpFromSignIn(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(true);
    });

    it('shouldAutoSignIn returns true for COMPLETE_AUTO_SIGN_IN', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signUpStep: 'COMPLETE_AUTO_SIGN_IN' } },
      } as any;
      expect(
        guards.shouldAutoSignIn({} as AuthActorContext, event, {} as any)
      ).toBe(true);
    });

    it('hasCompletedSignIn returns true for DONE', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signInStep: 'DONE' } },
      } as any;
      expect(
        guards.hasCompletedSignIn({} as AuthActorContext, event, {} as any)
      ).toBe(true);
    });

    it('hasCompletedSignUp returns true for DONE', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signUpStep: 'DONE' } },
      } as any;
      expect(
        guards.hasCompletedSignUp({} as AuthActorContext, event, {} as any)
      ).toBe(true);
    });

    it('hasCompletedResetPassword returns true for DONE', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { resetPasswordStep: 'DONE' } },
      } as any;
      expect(
        guards.hasCompletedResetPassword(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(true);
    });
  });

  describe('Actor done guards', () => {
    it('hasCompletedAttributeConfirmation returns true for CONFIRM_ATTRIBUTE_COMPLETE', () => {
      const event = {
        type: 'done.invoke',
        data: { step: 'CONFIRM_ATTRIBUTE_COMPLETE' },
      } as any;
      expect(
        guards.hasCompletedAttributeConfirmation(
          {} as AuthActorContext,
          event,
          {} as any
        )
      ).toBe(true);
    });
  });

  describe('Confirm sign in guards', () => {
    it('shouldConfirmSignIn returns false for non-MFA steps', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signInStep: 'DONE' } },
      } as any;
      expect(guards.shouldConfirmSignIn({} as any, event, {} as any)).toBe(
        false
      );
    });
  });

  describe('Confirm sign up guards', () => {
    it('shouldConfirmSignUp returns false for other steps', () => {
      const event = {
        type: 'done.invoke',
        data: { nextStep: { signUpStep: 'DONE' } },
      } as any;
      expect(guards.shouldConfirmSignUp({} as any, event, {} as any)).toBe(
        false
      );
    });
  });

  describe('Passkey registration guards', () => {
    it('shouldPromptPasskeyRegistration returns false when no prompts configured', () => {
      const context = {
        passwordless: {},
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('shouldPromptPasskeyRegistration returns false when user has passkeys', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignin: 'ALWAYS' },
        },
        hasExistingPasskeys: true,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('shouldPromptPasskeyRegistration returns true when boolean true', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: true,
        },
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(true);
    });

    it('shouldPromptPasskeyRegistration returns false when boolean false', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: false,
        },
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('shouldPromptPasskeyRegistration returns true when afterSignin is ALWAYS', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignin: 'ALWAYS' },
        },
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(true);
    });

    it('shouldPromptPasskeyRegistration returns false when afterSignin is not ALWAYS', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignin: 'NEVER' },
        },
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('shouldPromptPasskeyRegistrationAfterSignup returns true when afterSignup is ALWAYS', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignup: 'ALWAYS' },
        },
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistrationAfterSignup(
          context,
          {} as any,
          {} as any
        )
      ).toBe(true);
    });

    it('shouldPromptPasskeyRegistrationAfterSignup returns false when user has passkeys', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignup: 'ALWAYS' },
        },
        hasExistingPasskeys: true,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistrationAfterSignup(
          context,
          {} as any,
          {} as any
        )
      ).toBe(false);
    });
  });

  describe('shouldVerifyAttribute', () => {
    it('returns false when no data', () => {
      expect(
        guards.shouldVerifyAttribute({} as any, {} as any, {} as any)
      ).toBe(false);
    });

    it('returns false when no email or phone_number', () => {
      const context = { fetchedUserAttributes: {} } as any;
      expect(guards.shouldVerifyAttribute(context, {} as any, {} as any)).toBe(
        false
      );
    });

    it('returns true when both email and phone not verified', () => {
      const context = {
        fetchedUserAttributes: {
          email: 'test@example.com',
          email_verified: 'false',
          phone_number: '+1234567890',
          phone_number_verified: 'false',
        },
      } as any;
      expect(guards.shouldVerifyAttribute(context, {} as any, {} as any)).toBe(
        true
      );
    });

    it('returns false when email is verified', () => {
      const context = {
        fetchedUserAttributes: {
          email: 'test@example.com',
          email_verified: 'true',
          phone_number: '+1234567890',
          phone_number_verified: 'false',
        },
      } as any;
      expect(guards.shouldVerifyAttribute(context, {} as any, {} as any)).toBe(
        false
      );
    });
  });

  describe('shouldSelectAuthMethod', () => {
    it('returns true when multiple methods and no preferred challenge', () => {
      const context = {
        availableAuthMethods: ['PASSWORD', 'EMAIL_OTP'],
        preferredChallenge: undefined,
        selectedAuthMethod: null,
      } as any;
      expect(guards.shouldSelectAuthMethod(context, {} as any, {} as any)).toBe(
        true
      );
    });

    it('returns true when multiple methods and selectedAuthMethod is null', () => {
      const context = {
        availableAuthMethods: ['PASSWORD', 'EMAIL_OTP'],
        preferredChallenge: 'PASSWORD',
        selectedAuthMethod: null,
      } as any;
      expect(guards.shouldSelectAuthMethod(context, {} as any, {} as any)).toBe(
        true
      );
    });

    it('returns false when only one method', () => {
      const context = {
        availableAuthMethods: ['PASSWORD'],
        preferredChallenge: undefined,
        selectedAuthMethod: null,
      } as any;
      expect(guards.shouldSelectAuthMethod(context, {} as any, {} as any)).toBe(
        false
      );
    });

    it('returns false when preferred challenge set and method selected', () => {
      const context = {
        availableAuthMethods: ['PASSWORD', 'EMAIL_OTP'],
        preferredChallenge: 'PASSWORD',
        selectedAuthMethod: 'PASSWORD',
      } as any;
      expect(guards.shouldSelectAuthMethod(context, {} as any, {} as any)).toBe(
        false
      );
    });
  });

  describe('shouldReturnToSelectMethod', () => {
    it('returns true when selectedAuthMethod is set and step is SELECT_AUTH_METHOD', () => {
      const context = {
        selectedAuthMethod: 'EMAIL_OTP',
        step: 'SELECT_AUTH_METHOD',
      } as any;
      expect(
        guards.shouldReturnToSelectMethod(context, {} as any, {} as any)
      ).toBe(true);
    });

    it('returns false when selectedAuthMethod is null', () => {
      const context = {
        selectedAuthMethod: null,
        step: 'SELECT_AUTH_METHOD',
      } as any;
      expect(
        guards.shouldReturnToSelectMethod(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('returns false when step is SIGN_IN', () => {
      const context = {
        selectedAuthMethod: 'EMAIL_OTP',
        step: 'SIGN_IN',
      } as any;
      expect(
        guards.shouldReturnToSelectMethod(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('returns false when step is CONFIRM_SIGN_IN_WITH_SMS_CODE', () => {
      const context = {
        selectedAuthMethod: 'SMS_OTP',
        step: 'CONFIRM_SIGN_IN_WITH_SMS_CODE',
      } as any;
      expect(
        guards.shouldReturnToSelectMethod(context, {} as any, {} as any)
      ).toBe(false);
    });
  });

  describe('hasPasskeyRegistrationPrompts', () => {
    it('returns true when passkeyRegistrationPrompts is configured', () => {
      const context = {
        passwordless: {
          passkeyRegistrationPrompts: { afterSignup: 'ALWAYS' },
        },
      } as any;
      expect(
        guards.hasPasskeyRegistrationPrompts(context, {} as any, {} as any)
      ).toBe(true);
    });

    it('returns false when passkeyRegistrationPrompts is null', () => {
      const context = {
        passwordless: { passkeyRegistrationPrompts: null },
      } as any;
      expect(
        guards.hasPasskeyRegistrationPrompts(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('returns false when passwordless is undefined', () => {
      const context = {} as any;
      expect(
        guards.hasPasskeyRegistrationPrompts(context, {} as any, {} as any)
      ).toBe(false);
    });
  });
});
