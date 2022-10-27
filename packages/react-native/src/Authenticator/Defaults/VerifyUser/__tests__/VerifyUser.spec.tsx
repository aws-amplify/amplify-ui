import React from 'react';
import { render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { VerifyUser } from '..';

const { getSkipText, getVerifyText, getAccountRecoveryInfoText } =
  authenticatorTextUtil;

const props = {
  fields: [],
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
