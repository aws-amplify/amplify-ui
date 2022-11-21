import { COMPONENT_ROUTE_KEYS } from '../constants';
import { AuthenticatorRouteComponentKey } from '../types';
import { isComponentRouteKey, resolveAuthenticatorComponents } from '../utils';

import {
  DEFAULTS,
  INVALID_OVERRIDES,
  INVALID_SIGN_IN_OVERRIDES,
  OVERRIDES,
} from '../__mock__/components';

describe('isComponentRouteKey', () => {
  it.each(COMPONENT_ROUTE_KEYS)('returns true for a %s value', (route) => {
    const output = isComponentRouteKey(route);
    expect(output).toBe(true);
  });

  it('returns false for a non-component route key value', () => {
    const output = isComponentRouteKey(
      'route' as AuthenticatorRouteComponentKey
    );

    expect(output).toBe(false);
  });
});

describe('resolveAuthenticatorComponents', () => {
  it('returns defaults when no overrides are defined', () => {
    const output = resolveAuthenticatorComponents(DEFAULTS);
    expect(output).toBe(DEFAULTS);
  });

  it('returns the expected components when an override is provided', () => {
    const output = resolveAuthenticatorComponents(DEFAULTS, OVERRIDES);

    expect(output.ConfirmResetPassword).not.toBe(DEFAULTS.ConfirmResetPassword);
    expect(output.ConfirmResetPassword).toBe(OVERRIDES.ConfirmResetPassword);
    expect(output.ConfirmSignIn).toBe(DEFAULTS.ConfirmSignIn);
    expect(output.VerifyUser).toBe(DEFAULTS.VerifyUser);
  });

  it('returns the expected components when an override is invalid', () => {
    const output = resolveAuthenticatorComponents(
      DEFAULTS,
      INVALID_SIGN_IN_OVERRIDES
    );

    expect(output.SignIn).not.toBe(INVALID_SIGN_IN_OVERRIDES.SignIn);
    expect(output.SignIn).toBe(DEFAULTS.SignIn);
  });

  it('returns the expected components when the overrides param is invalid', () => {
    const output = resolveAuthenticatorComponents(DEFAULTS, INVALID_OVERRIDES);

    expect(output).toStrictEqual(DEFAULTS);
  });
});
