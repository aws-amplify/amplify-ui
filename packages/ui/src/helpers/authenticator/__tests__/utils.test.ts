import { configureComponent, getTotpCodeURL, trimValues } from '../utils';

import * as AuthModule from '@aws-amplify/auth';

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

describe('trimValues', () => {
  it('trims all values', () => {
    const formData = { username: ' username ', first_name: ' john ' };
    const result = trimValues(formData);

    expect(result).toMatchObject({ username: 'username', first_name: 'john' });
  });

  it('does not trim ignored value', () => {
    const formData = { password: ' test ', confirm_password: ' test ' };
    const result = trimValues(formData, 'password', 'confirm_password');

    expect(result).toMatchObject(formData);
  });

  it('trims all values except ignored values', () => {
    const formData = {
      username: ' test ',
      password: ' password ',
      first_name: ' john ',
    };
    const result = trimValues(formData, 'password');

    expect(result).toMatchObject({
      username: 'test',
      password: ' password ',
      first_name: 'john',
    });
  });
});

describe('configureComponent', () => {
  it('appends package name and version to Cognito user agent', () => {
    const appendToCognitoUserAgentSpy = jest.spyOn(
      AuthModule,
      'appendToCognitoUserAgent'
    );
    const packageName = '@aws-amplify/ui-react';
    const version = '3.5.10';

    configureComponent({ packageName, version });

    expect(appendToCognitoUserAgentSpy).toHaveBeenCalledWith(
      `${packageName}/${version}`
    );
  });
});
