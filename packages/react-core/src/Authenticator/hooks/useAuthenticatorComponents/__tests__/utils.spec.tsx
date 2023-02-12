import { mergeComponents } from '../utils';

import {
  DEFAULTS,
  INVALID_OVERRIDES,
  INVALID_SIGN_IN_OVERRIDES,
  OVERRIDES,
} from '../__mock__/components';

describe('mergeComponents', () => {
  it('returns defaults when no overrides are defined', () => {
    const output = mergeComponents(DEFAULTS);
    expect(output).toBe(DEFAULTS);
  });

  it('returns the expected components when an override is provided', () => {
    const output = mergeComponents(DEFAULTS, OVERRIDES);

    expect(output.ConfirmResetPassword).not.toBe(DEFAULTS.ConfirmResetPassword);
    expect(output.ConfirmResetPassword).toBe(OVERRIDES.ConfirmResetPassword);
    expect(output.ConfirmSignIn).toBe(DEFAULTS.ConfirmSignIn);
    expect(output.VerifyUser).toBe(DEFAULTS.VerifyUser);
  });

  it('returns the expected components when an override is invalid', () => {
    const output = mergeComponents(DEFAULTS, INVALID_SIGN_IN_OVERRIDES);

    expect(output.SignIn).not.toBe(INVALID_SIGN_IN_OVERRIDES.SignIn);
    expect(output.SignIn).toBe(DEFAULTS.SignIn);
  });

  it('returns the expected components when the overrides param is invalid', () => {
    const output = mergeComponents(DEFAULTS, INVALID_OVERRIDES);

    expect(output).toStrictEqual(DEFAULTS);
  });
});
