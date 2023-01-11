import { FormFieldsArray } from '../../../../types';

import { removeOrderKeys } from '../formFields';

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

describe('getSortedFormFields', () => {
  it('removes the order keys from the field values', () => {
    const output = removeOrderKeys(fields);

    expect(output[0][1].order).toBeUndefined();
  });
});
