import {
  AuthActorState,
  AuthMachineState,
} from '../../../machines/authenticator/types';

import { getRoute } from '../getRoute';

describe('getRoute', () => {
  const getState = (value = 'unknown') => {
    return {
      value,
      matches: function (this: AuthMachineState, targetState: string) {
        return this.value === targetState;
      },
    } as AuthMachineState;
  };

  const getActorState = (value = 'unknown') => {
    return {
      value,
      matches: function (targetState: string) {
        return this.value === targetState;
      },
    } as AuthActorState;
  };

  it('should return `null` when the current state is unknown', () => {
    const state = getState();
    const actorState = getActorState();

    expect(getRoute(state, actorState)).toBe(null);
  });

  it.each(['idle', 'setup'])(
    "should return the '%s' route when the current state is '%s'",
    (route: string) => {
      const state = getState(route);
      const actorState = getActorState(); // actor state is undefined here

      expect(getRoute(state, actorState)).toBe(route);
    }
  );

  it("should return the 'signOut' route when the current state is 'signOut'", () => {
    const state = getState('signOut');
    const actorState = getActorState('pending');

    expect(getRoute(state, actorState)).toBe('signOut');
  });

  it("should return the 'authenticated' route when the current state is 'authenticated'", () => {
    const state = getState('authenticated');
    const actorState = getActorState('resolved');

    expect(getRoute(state, actorState)).toBe('authenticated');
  });

  it.each(['confirmSignUp', 'resendSignUpCode'])(
    "should return the 'confirmSignUp' route when the current actorState is '%s'",
    (route: string) => {
      const state = getState('signInActor.runActor');
      const actorState = getActorState(route);

      expect(getRoute(state, actorState)).toBe('confirmSignUp');
    }
  );

  it("should return the 'confirmSignIn' route when the current actorState is 'confirmSignIn'", () => {
    const state = getState('signInActor.runActor');
    const actorState = getActorState('confirmSignIn');

    expect(getRoute(state, actorState)).toBe('confirmSignIn');
  });

  it.each(['setupTotp.edit', 'setupTotp.submit'])(
    "should return the 'setupTotp' route when the current actorState is '%s'",
    (route: string) => {
      const state = getState('signInActor.runActor');
      const actorState = getActorState(route);

      expect(getRoute(state, actorState)).toBe('setupTotp');
    }
  );

  it.each(['signIn', 'signUp'])(
    "should return the '%s' route when actorState is 'federatedSignIn",
    (route: string) => {
      const state = getState(`${route}Actor`);
      const actorState = getActorState('federatedSignIn');

      expect(getRoute(state, actorState)).toBe(route);
    }
  );

  it("should return the 'signIn' route when actorState is 'signIn'", () => {
    const state = getState('signInActor.runActor');
    const actorState = getActorState('signIn');

    expect(getRoute(state, actorState)).toBe('signIn');
  });

  it.each(['signUp', 'autoSignIn'])(
    "should return the 'signUp' route when actorState is '%s'",
    (route: string) => {
      const state = getState('signUpActor.runActor');
      const actorState = getActorState(route);

      expect(getRoute(state, actorState)).toBe('signUp');
    }
  );

  it("should return the 'forceNewPassword' route when the current actorState is 'forceChangePassword'", () => {
    const state = getState('signInActor.runActor');
    const actorState = getActorState('forceChangePassword');

    expect(getRoute(state, actorState)).toBe('forceNewPassword');
  });

  it("should return the 'forgotPassword' route when the current actorState is 'forgotPassword'", () => {
    const state = getState('forgotPasswordActor.runActor');
    const actorState = getActorState('forgotPassword');

    expect(getRoute(state, actorState)).toBe('forgotPassword');
  });

  it("should return the 'confirmResetPassword' route when the current actorState is 'confirmResetPassword'", () => {
    const state = getState('forgotPasswordActor.runActor');
    const actorState = getActorState('confirmResetPassword');

    expect(getRoute(state, actorState)).toBe('confirmResetPassword');
  });

  it("should return the 'verifyUser' route when the current actorState is 'selectUserAttributes'", () => {
    const state = getState('verifyUserAttributesActor.runActor');
    const actorState = getActorState('selectUserAttributes');

    expect(getRoute(state, actorState)).toBe('verifyUser');
  });

  it("should return the 'confirmVerifyUser' route when the current actorState is 'confirmVerifyUserAttribute'", () => {
    const state = getState('verifyUserAttributesActor.runActor');
    const actorState = getActorState('confirmVerifyUserAttribute');

    expect(getRoute(state, actorState)).toBe('confirmVerifyUser');
  });

  it("should return the 'transition' route when the current state is 'getCurrentUser'", () => {
    const state = getState('getCurrentUser');
    const actorState = getActorState('resolved');

    expect(getRoute(state, actorState)).toBe('transition');
  });

  it("should return the 'transition' route when the current actorState is 'fetchUserAttributes'", () => {
    const state = getState('signInActor.runActor');
    const actorState = getActorState('fetchUserAttributes');

    expect(getRoute(state, actorState)).toBe('transition');
  });

  it("should return 'passkeyPrompt' when actorState matches 'passkeyPrompt'", () => {
    const state = getState('signInActor.runActor');
    const actorState = {
      value: 'passkeyPrompt',
      matches: (targetState: string) => targetState === 'passkeyPrompt',
    } as unknown as AuthActorState;

    expect(getRoute(state, actorState)).toBe('passkeyPrompt');
  });

  it("should return 'signInSelectAuthFactor' when actorState matches 'signIn.selectMethod'", () => {
    const state = getState('signInActor.runActor');
    const actorState = {
      value: { signIn: 'selectMethod' },
      matches: (targetState: string) => targetState === 'signIn.selectMethod',
    } as unknown as AuthActorState;

    expect(getRoute(state, actorState)).toBe('signInSelectAuthFactor');
  });

  it("should return 'signInSelectAuthFactor' when actorState matches 'signIn.submit' with selectedAuthMethod", () => {
    const state = getState('signInActor.runActor');
    const actorState = {
      value: { signIn: 'submit' },
      context: { selectedAuthMethod: 'EMAIL_OTP' },
      matches: (targetState: string) => targetState === 'signIn.submit',
    } as unknown as AuthActorState;

    expect(getRoute(state, actorState)).toBe('signInSelectAuthFactor');
  });

  it("should return 'signIn' when actorState matches 'signIn.submit' without selectedAuthMethod", () => {
    const state = getState('signInActor.runActor');
    const actorState = {
      value: { signIn: 'submit' },
      context: { selectedAuthMethod: null },
      matches: (targetState: string) => targetState === 'signIn.submit',
    } as unknown as AuthActorState;

    expect(getRoute(state, actorState)).toBe('signIn');
  });
});
