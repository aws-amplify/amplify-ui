import {
  AuthFormFields,
  AuthMachineState,
  FormFieldOptions,
  FormFieldsArray,
  LoginMechanism,
} from '../../../../types';

import { getCustomFormFields, removeOrderKeys } from '../formFields';

const fields: FormFieldsArray = [
  [
    'name',
    {
      order: 1,
      isRequired: true,
      placeholder: 'First Name',
      autocomplete: 'given-name',
      labelHidden: true,
    },
  ],
  [
    'family_name',
    {
      order: 2,
      isRequired: true,
      placeholder: 'Last Name',
      labelHidden: true,
    },
  ],
  [
    'username',
    {
      order: 3,
      isRequired: true,
      placeholder: 'Email Address',
      labelHidden: true,
    },
  ],
  [
    'email',
    {
      order: 4,
      isRequired: true,
      placeholder: 'Confirm Email Address',
      labelHidden: true,
    },
  ],
  ['password', { order: 5, isRequired: true, labelHidden: true }],
  ['confirm_password', { order: 6, isRequired: true, labelHidden: true }],
  ['phone_number', { order: 7, dialCode: '+44', labelHidden: true }],
];

const generateMockState = (
  formFields: AuthFormFields | undefined,
  usernameAlias: LoginMechanism
): AuthMachineState => {
  return {
    context: {
      actorRef: { getSnapshot: () => ({ context: { formFields } }) },
      config: { loginMechanisms: [usernameAlias] },
    },
  } as AuthMachineState;
};

describe('removeOrderKeys', () => {
  it('removes the order keys from the field values', () => {
    const output = removeOrderKeys(fields);

    expect(output[0][1].order).toBeUndefined();
  });
});

describe('getCustomFormField', () => {
  it('returns empty object if customFormFields is not present', () => {
    const state = generateMockState(undefined, 'email');
    const result = getCustomFormFields('signIn', state);

    expect(result).toStrictEqual({});
  });

  it('returns empty object if customFormFields is empty', () => {
    const state = generateMockState({}, 'email');

    const result = getCustomFormFields('signIn', state);
    expect(result).toStrictEqual({});
  });

  it('applies defaults to signin username when loginMechanism is set to email', () => {
    const formFields: AuthFormFields = {
      signIn: {
        username: {
          label: 'Mock Email Label',
        },
      },
    };
    const state = generateMockState(formFields, 'email');

    const {
      username: { label, placeholder, type, autocomplete, isRequired },
    } = getCustomFormFields('signIn', state);

    // overriden value should be present
    expect(label).toMatch('Mock Email Label');

    // default values should be applied
    expect(placeholder).toMatch('Enter your Email'); // This should say "email", not "username"
    expect(type).toMatch('email');
    expect(autocomplete).toMatch('username');
    expect(isRequired).toBe(true);
  });

  it('applies defaults to signin username when loginMechanism is set to phone', () => {
    const formFields: AuthFormFields = {
      signIn: {
        username: {
          label: 'Mock Phone Label',
        },
      },
    };
    const state = generateMockState(formFields, 'phone_number');

    const {
      username: { label, placeholder, type, autocomplete, isRequired },
    } = getCustomFormFields('signIn', state);

    // overriden value should be present
    expect(label).toMatch('Mock Phone Label');

    // default values should be applied
    expect(placeholder).toMatch('Enter your Phone Number'); // This should say "email", not "username"
    expect(type).toMatch('tel');
    expect(autocomplete).toMatch('username');
    expect(isRequired).toBe(true);
  });

  it('applies defaults to fields with known auth attributes', () => {
    const formFields = {
      signUp: {
        username: { placeholder: 'Mock Username Placeholder' },
        email: { placeholder: 'Mock Email Placeholder' },
        password: { placeholder: 'Mock Password Placeholder' },
      },
    };

    const state = generateMockState(formFields, 'username');

    const { username, email, password } = getCustomFormFields('signUp', state);

    expect(username.label).toMatch('Username');
    expect(username.placeholder).toMatch('Mock Username Placeholder');
    expect(email.label).toMatch('Email');
    expect(email.placeholder).toMatch('Mock Email Placeholder');
    expect(password.label).toMatch('Password');
    expect(password.placeholder).toMatch('Mock Password Placeholder');

    expect({ username, email, password }).toMatchSnapshot();
  });

  it('does not apply default to fields without defaults', () => {
    const zoneinfoOptions: FormFieldOptions = {
      label: 'Zone Info',
      placeholder: 'Enter your zone',
      isRequired: false,
      labelHidden: true,
      order: 3,
      type: 'text',
    };
    const formFields = { signUp: { zoneinfo: zoneinfoOptions } };
    const state = generateMockState(formFields, 'username');

    const { zoneinfo } = getCustomFormFields('signUp', state);
    expect(zoneinfo).toStrictEqual(zoneinfoOptions);
  });

  it('applies defaults to known auth fields on resetPassword with email loginMechanism', () => {
    const zoneinfoOptions: FormFieldOptions = {
      label: 'Zone Info',
      type: 'text',
      placeholder: 'Enter your Zone',
    };

    const formFields = {
      resetPassword: {
        username: { label: 'Mock Email Label' }, // resetPassword uses "username" as "email"
        password: { label: 'Mock Password Label' }, // known cognito attribute
        birthdate: { label: 'Mock Birthdate Label' }, // known cognito attribute
        zoneinfo: zoneinfoOptions, // cognito attribute without defaults
      },
    };

    const state = generateMockState(formFields, 'email');
    const result = getCustomFormFields('resetPassword', state);

    expect(result).toMatchSnapshot();
    const { username, password, birthdate, zoneinfo } = result;

    expect(username.label).toMatch('Mock Email Label');
    expect(username.placeholder).toMatch('Enter your Email');

    expect(password.label).toMatch('Mock Password Label');
    expect(password.placeholder).toMatch('Enter your Password');

    expect(birthdate.label).toMatch('Mock Birthdate Label');
    expect(birthdate.placeholder).toMatch('Enter your Birthdate');

    expect(zoneinfo).toStrictEqual(zoneinfoOptions);
  });
});
