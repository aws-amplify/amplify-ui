import { getUserAttributes } from '../utils';

describe('getUserAttributes', () => {
  it('returns the phone_number attribute as expected when provided', () => {
    const formValues = { country_code: '+26', phone_number: '8002428976' };
    const output = getUserAttributes(formValues);

    const expected = { phone_number: '+268002428976' };
    expect(output).toStrictEqual(expected);
  });

  it('does not returns the phone_number attribute when undefined', () => {
    const formValues = {
      email: 'example#example.com',
      phone_number: undefined,
    };
    const output = getUserAttributes(formValues);

    const expected = { email: 'example#example.com' };
    expect(output).toStrictEqual(expected);
  });
});
