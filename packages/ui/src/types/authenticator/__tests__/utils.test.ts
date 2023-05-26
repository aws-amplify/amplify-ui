import { UnverifiedContactMethodType } from '../user';
import { isUnverifiedContactMethodType } from '../utils';

describe('isUnverifiedContactMethodType', () => {
  it('returns true for a valid unverified contact method type', () => {
    expect(
      isUnverifiedContactMethodType(UnverifiedContactMethodType.Email)
    ).toBe(true);
    expect(
      isUnverifiedContactMethodType(UnverifiedContactMethodType.PhoneNumber)
    ).toBe(true);
  });

  it('returns false for an invalid unverified contact method type', () => {
    expect(isUnverifiedContactMethodType('invalid')).toBe(false);
  });
});
