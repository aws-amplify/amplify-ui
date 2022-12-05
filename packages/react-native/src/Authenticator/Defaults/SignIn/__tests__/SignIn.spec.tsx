import React from 'react';
import { render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import SignIn from '../SignIn';

const { getSignInText, getForgotPasswordText } = authenticatorTextUtil;

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const password = {
  name: 'password',
  label: 'Password',
  placeholder: 'Password',
  type: 'password' as const,
};

const fields = [username, password];

const props = {
  fields,
  Footer: SignIn.Footer,
  FormFields: SignIn.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: SignIn.Header,
  isPending: false,
  socialProviders: undefined,
  toResetPassword: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toSignUp: jest.fn(),
};

describe('SignIn', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(<SignIn {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('text')).toHaveLength(fields.length);
    expect(getByText(getSignInText())).toBeDefined();
    expect(getByText(getForgotPasswordText(true))).toBeDefined();
  });

  it('renders as expected with an error', () => {
    const error = 'An error!';
    const { getByRole, getByText, toJSON } = render(
      <SignIn {...props} error={error} />
    );

    expect(getByRole('alert')).toBeDefined();
    expect(getByText(error)).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when hideSignUp is true', () => {
    const { toJSON } = render(<SignIn {...props} hideSignUp />);
    expect(toJSON()).toMatchSnapshot();
  });
});
