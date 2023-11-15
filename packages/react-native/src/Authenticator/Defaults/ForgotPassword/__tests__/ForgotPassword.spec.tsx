import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { ForgotPassword } from '..';

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const fields = [username];

const props = {
  fields,
  Footer: ForgotPassword.Footer,
  FormFields: ForgotPassword.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  hasValidationErrors: false,
  Header: ForgotPassword.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

const {
  getResetYourPasswordText,
  getSendCodeText,
  getSendingText,
  getBackToSignInText,
} = authenticatorTextUtil;

describe('ForgotPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <ForgotPassword {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getResetYourPasswordText())).toBeDefined();
    expect(getByText(getSendCodeText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(fields.length);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <ForgotPassword {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <ForgotPassword {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toHaveBeenCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<ForgotPassword {...props} isPending />);

    expect(queryByText(getSendingText())).toBeDefined();
    expect(queryByText(getSendCodeText())).toBe(null);
  });
});
