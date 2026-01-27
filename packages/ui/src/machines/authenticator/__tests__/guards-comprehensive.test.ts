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
        passwordlessAuthOptions: {},
        hasExistingPasskeys: false,
      } as any;
      expect(
        guards.shouldPromptPasskeyRegistration(context, {} as any, {} as any)
      ).toBe(false);
    });

    it('shouldPromptPasskeyRegistration returns false when user has passkeys', () => {
      const context = {
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
        passwordlessAuthOptions: {
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
});
