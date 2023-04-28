import { createAuthenticatorMachine } from '../index';

describe('createAuthenticatorMachine', () => {
  it('should create AuthenticatorMachine and run actor when sign-in', () => {
    const authenticatorMachine = createAuthenticatorMachine();
    const expectedValue = { signIn: 'runActor' };
    const actualState = authenticatorMachine.transition('signIn', {
      type: 'SUBMIT',
    });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
});
