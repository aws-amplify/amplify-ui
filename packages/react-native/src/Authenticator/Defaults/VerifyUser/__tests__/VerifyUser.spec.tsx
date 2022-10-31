import React from 'react';
import { render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { VerifyUser } from '..';
import { RadioFieldOptions } from '../../../hooks/types';

const { getSkipText, getVerifyText, getAccountRecoveryInfoText } =
  authenticatorTextUtil;

const radioEmailField = {
  type: 'radio',
  name: 'email',
  value: 'hello@world.com',
} as RadioFieldOptions;

const radioPhoneField = {
  type: 'radio',
  name: 'phone',
  value: '+1 000-000-0000',
} as RadioFieldOptions;

const radioField = {
  type: 'radio',
  name: 'test',
  value: 'testValue',
} as RadioFieldOptions;

const props = {
  fields: [radioEmailField, radioPhoneField, radioField],
  FormFields: VerifyUser.FormFields,
  Footer: VerifyUser.Footer,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: VerifyUser.Header,
  isPending: false,
  skipVerification: jest.fn(),
};

describe('VerifyUser', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole, getByText } = render(<VerifyUser {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
    expect(getByRole('radiogroup')).toBeDefined();
    expect(getByText(getAccountRecoveryInfoText())).toBeDefined();
    expect(getByText(getSkipText())).toBeDefined();
    expect(getByText(getVerifyText())).toBeDefined();
    expect(getByText('h***o@world.com')).toBeDefined();
    expect(getByText('***********0000')).toBeDefined();
    expect(getByText('testValue')).toBeDefined();
  });

  it('renders as expected with errors', () => {
    const error = 'Something went wrong';
    const { toJSON, getByRole, getByText } = render(
      <VerifyUser {...props} error={error} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('alert')).toBeDefined();
    expect(getByText(error)).toBeDefined();
  });

  it('renders as expected when isPending is true', () => {
    const { toJSON, getByText } = render(<VerifyUser {...props} isPending />);
    expect(toJSON()).toMatchSnapshot();

    expect(getByText('Verifying...')).toBeDefined();
  });
});
