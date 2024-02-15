import { LoginMechanism } from '../../../types';
import { AuthActorContext } from '../types';
import { getUserAttributes, getSignUpInput, getUsernameSignUp } from '../utils';

describe('getUserAttributes', () => {
  it('returns the phone_number attribute as expected when provided', () => {
    const formValues = { country_code: '+26', phone_number: '8002428976' };
    const output = getUserAttributes(formValues);

    const expected = { phone_number: '+268002428976' };
    expect(output).toStrictEqual(expected);
  });

  it('does not returns the phone_number attribute when undefined', () => {
    const formValues = {
      email: 'example@example.com',
      country_code: '+1',
      phone_number: undefined,
    };
    const output = getUserAttributes(formValues);

    const expected = { email: 'example@example.com' };
    expect(output).toStrictEqual(expected);
  });

  it('returns an undefined value phone_number attribute when phone_number is an empty string', () => {
    const formValues = {
      email: 'example@example.com',
      country_code: '+1',
      phone_number: '',
    };
    const output = getUserAttributes(formValues);

    const expected = { email: 'example@example.com' };
    expect(output).toStrictEqual(expected);
  });
});

describe('getSignUpInput', () => {
  it('returns the expected values when loginMechanism is phone_number', () => {
    const username = '+268002428976';

    const formValues = {
      phone_number: '8002428976',
      password: 'a_password',
      confirm_password: 'a_password',
      email: 'example@example.com',
      country_code: '+26',
    };

    const output = getSignUpInput(username, formValues, 'phone_number');

    expect(output).toStrictEqual({
      options: {
        autoSignIn: true,
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+268002428976',
        },
      },
      password: 'a_password',
      username: '+268002428976',
    });
  });
});

describe('getUsernameSignUp', () => {
  it('returns the expected values when loginMechanism is phone_number', () => {
    const formValues = {
      username: undefined,
      phone_number: '8002428976',
      password: 'a_password',
      confirm_password: 'a_password',
      email: 'example@example.com',
      country_code: '+26',
    };

    const output = getUsernameSignUp({
      formValues,
      loginMechanisms: ['phone_number' as LoginMechanism],
    } as unknown as AuthActorContext);

    const expected = '+268002428976';
    expect(output).toEqual(expected);
  });
});
