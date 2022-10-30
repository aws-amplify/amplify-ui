import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { ResetPassword } from '..';

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const fields = [username];

const props = {
  fields,
  Footer: ResetPassword.Footer,
  FormFields: ResetPassword.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ResetPassword.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

const {
  getResetYourPasswordText,
  getSendCodeText,
  getSendingText,
  getBackToSignInText,
} = authenticatorTextUtil;

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <ResetPassword {...props} />
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
      <ResetPassword {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <ResetPassword {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toBeCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<ResetPassword {...props} isPending />);

    expect(queryByText(getSendingText())).toBeDefined();
    expect(queryByText(getSendCodeText())).toBe(null);
  });
});
