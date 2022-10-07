import { getTotpCodeURL } from '../utils';

const SECRET_KEY = 'shhhhh';
const USERNAME = 'username';

describe('getTotpCodeURL', () => {
  it('returns the expected value in the happy path', () => {
    const issuer = 'issuer';

    const customTotpCode = getTotpCodeURL(issuer, USERNAME, SECRET_KEY);

    expect(customTotpCode).toBe(
      'otpauth://totp/issuer:username?secret=shhhhh&issuer=issuer'
    );
  });

  it('handles a issuer value with spaces', () => {
    const issuer = 'issuer with spaces';

    const customTotpCode = getTotpCodeURL(issuer, USERNAME, SECRET_KEY);

    expect(customTotpCode).toBe(
      'otpauth://totp/issuer%20with%20spaces:username?secret=shhhhh&issuer=issuer%20with%20spaces'
    );
  });
});
