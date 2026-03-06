import { getConfirmSignInFormValuesKey } from '../actors/utils';
import type { Step } from '../types';

describe('getConfirmSignInFormValuesKey', () => {
  it('should return mfa_type for MFA_SELECTION step', () => {
    const result = getConfirmSignInFormValuesKey(
      'CONTINUE_SIGN_IN_WITH_MFA_SELECTION' as Step
    );
    expect(result).toBe('mfa_type');
  });

  it('should return mfa_type for MFA_SETUP_SELECTION step', () => {
    const result = getConfirmSignInFormValuesKey(
      'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION' as Step
    );
    expect(result).toBe('mfa_type');
  });

  it('should return email for EMAIL_SETUP step', () => {
    const result = getConfirmSignInFormValuesKey(
      'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP' as Step
    );
    expect(result).toBe('email');
  });

  it('should return confirmation_code for other steps', () => {
    const result = getConfirmSignInFormValuesKey(
      'CONFIRM_SIGN_IN_WITH_TOTP_CODE' as Step
    );
    expect(result).toBe('confirmation_code');
  });

  it('should return confirmation_code for CONFIRM_SIGN_IN step', () => {
    const result = getConfirmSignInFormValuesKey('CONFIRM_SIGN_IN' as Step);
    expect(result).toBe('confirmation_code');
  });
});
