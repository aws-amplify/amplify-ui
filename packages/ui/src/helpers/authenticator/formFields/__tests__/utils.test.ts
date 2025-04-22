import { AuthMachineState } from '../../../../machines/authenticator/types';

import { translate } from '../../../../i18n';
import { FormFields } from '../../../../types';

import { applyTranslation, getPrimaryAlias, sortFormFields } from '../utils';

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
    // @ts-expect-error robustness check
    expect(getPrimaryAlias(null)).toEqual('username');
  });
});

describe('applyTranslation', () => {
  const formFields = {
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
      order: 2,
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
      order: 1,
    },
    message: {
      label: 'Message',
      order: 3,
    },
  };

  const expectedFormFields: FormFields = {
    name: {
      label: translate<string>(formFields.name.label),
      placeholder: translate<string>(formFields.name.placeholder),
      required: true,
      order: 2,
    },
    email: {
      label: translate<string>(formFields.email.label),
      placeholder: translate<string>(formFields.email.placeholder),
      order: 1,
    },
    message: {
      label: translate<string>(formFields.message.label),
      placeholder: undefined,
      order: 3,
    },
  };

  it('should apply translations to label and placeholder', () => {
    const translatedFormFields = applyTranslation(formFields);
    expect(translatedFormFields).toStrictEqual(expectedFormFields);
  });

  it('should return a new object and not modify the original object', () => {
    const originalFormFields = { ...formFields };
    const translatedFormFields = applyTranslation(formFields);
    expect(translatedFormFields).toStrictEqual(expectedFormFields);
    expect(formFields).toEqual(originalFormFields);
  });
});

describe('sortFormFields', () => {
  const formFields: FormFields = {
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
      order: 2,
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
      order: 1,
    },
    message: {
      label: 'Message',
      order: 3,
    },
  };

  it('should sort formFields according to their `order`', () => {
    const sortedFormFields = sortFormFields(formFields);
    expect(sortedFormFields).toStrictEqual([
      [
        'email',
        {
          label: 'Email',
          placeholder: 'Enter your email',
          order: 1,
        },
      ],
      [
        'name',
        {
          label: 'Name',
          placeholder: 'Enter your name',
          required: true,
          order: 2,
        },
      ],
      [
        'message',
        {
          label: 'Message',
          order: 3,
        },
      ],
    ]);
  });
});
