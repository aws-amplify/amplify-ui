import {
  AuthActorState,
  AuthMachineState,
} from '../../../machines/authenticator/types';

import { getRoute } from '../getRoute';

describe('getRoute', () => {
  let mockState: AuthMachineState;
  let mockActorState: AuthActorState;

  beforeEach(() => {
    mockState = {
      value: 'unknown',
      matches: function (this: AuthMachineState, targetState: string) {
        return this.value === targetState;
      },
    } as AuthMachineState;

    mockActorState = {
      value: 'unknown',
      matches: function (this: AuthActorState, targetState: string) {
        return this.value === targetState;
      },
    } as AuthActorState;
  });

  it.each(['idle', 'setup', 'signOut', 'authenticated'])(
    'should return the correct route for state %s',
    (route: string) => {
      mockState.value = route;
      expect(getRoute(mockState, mockActorState)).toBe(route);
    }
  );

  it.each([
    'confirmSignUp',
    'confirmSignIn',
    'signIn',
    'signUp',
    'forgotPassword',
    'confirmResetPassword',
  ])('should return the correct route for actorState %s', (route: string) => {
    mockActorState.value = route;
    expect(getRoute(mockState, mockActorState)).toBe(route);
  });

  it('should return the correct route for actorState resendSignUpCode', () => {
    mockActorState.value = 'resendSignUpCode';
    expect(getRoute(mockState, mockActorState)).toBe('confirmSignUp');
  });

  it('should return the correct route for actorState setupTotp', () => {
    mockActorState.value = 'setupTotp.edit';
    expect(getRoute(mockState, mockActorState)).toBe('setupTotp');

    mockActorState.value = 'setupTotp.submit';
    expect(getRoute(mockState, mockActorState)).toBe('setupTotp');
  });

  it('should return the correct route for actorState federatedSignIn', () => {
    mockActorState.value = 'federatedSignIn';
    expect(getRoute(mockState, mockActorState)).toBe('signIn');
  });

  it('should return the correct route for actorState autoSignIn', () => {
    mockActorState.value = 'autoSignIn';
    expect(getRoute(mockState, mockActorState)).toBe('signUp');
  });

  it('should return the correct route for actorState forceChangePassword', () => {
    mockActorState.value = 'forceChangePassword';
    expect(getRoute(mockState, mockActorState)).toBe('forceNewPassword');
  });

  it('should return the correct route for actorState selectUserAttributes', () => {
    mockActorState.value = 'selectUserAttributes';
    expect(getRoute(mockState, mockActorState)).toBe('verifyUser');
  });

  it('should return the correct route for actorState confirmVerifyUserAttribute', () => {
    mockActorState.value = 'confirmVerifyUserAttribute';
    expect(getRoute(mockState, mockActorState)).toBe('confirmVerifyUser');
  });

  it('should return the correct route for actorState getCurrentUser', () => {
    mockState.value = 'getCurrentUser';
    expect(getRoute(mockState, mockActorState)).toBe('transition');
  });

  it('should return the correct route for actorState fetchUserAttributes', () => {
    mockActorState.value = 'fetchUserAttributes';
    expect(getRoute(mockState, mockActorState)).toBe('transition');
  });
});
