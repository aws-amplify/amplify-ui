import { AuthContext, AuthMachineState } from '../../../types';
import { getPrimaryAlias, getConfiguredAliases } from '../context';

describe('getPrimaryAlias', () => {
  it('returns "username" when no login mechanisms are provided', () => {
    const state = { context: { config: {} } } as AuthMachineState;
    expect(getPrimaryAlias(state)).toEqual('username');
  });

  it('returns the first login mechanism when provided', () => {
    const state = {
      context: { config: { loginMechanisms: ['email', 'phone_number'] } },
    } as AuthMachineState;
    expect(getPrimaryAlias(state)).toEqual('email');
  });

  it("shouldn't break if state isn't provided", () => {
    expect(getPrimaryAlias(null)).toEqual('username');
  });
});

describe('getConfiguredAliases', () => {
  it('should return primaryAlias and secondaryAliases when both are present in config', () => {
    const context = {
      config: {
        loginMechanisms: ['email', 'phone_number'],
      },
    } as AuthContext;
    const expected = {
      primaryAlias: 'email',
      secondaryAliases: ['phone_number'],
    };
    expect(getConfiguredAliases(context)).toEqual(expected);
  });

  it('should return only primaryAlias when only one login mechanism is configured', () => {
    const context = {
      config: {
        loginMechanisms: ['username'],
      },
    } as AuthContext;
    const expected = {
      primaryAlias: 'username',
      secondaryAliases: [],
    };
    expect(getConfiguredAliases(context)).toEqual(expected);
  });

  it('should filter out non-supported login mechanisms', () => {
    const context = {
      config: {
        loginMechanisms: ['email', 'phone_number', 'unsupported'],
      },
    } as AuthContext;
    const expected = {
      primaryAlias: 'email',
      secondaryAliases: ['phone_number'],
    };
    expect(getConfiguredAliases(context)).toEqual(expected);
  });
});
