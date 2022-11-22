import React from 'react';
import { render } from '@testing-library/react-native';

import { SignUp } from '..';
import { authenticatorTextUtil } from '@aws-amplify/ui';

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
const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'password' as const,
};
const phone = {
  name: 'phone',
  label: 'Phone',
  placeholder: 'Phone',
  type: 'phone' as const,
};

const fields = [username, password, confirmPassword, phone];

const props = {
  fields,
  FormFields: SignUp.FormFields,
  Footer: SignUp.Footer,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: SignUp.Header,
  isPending: false,
  socialProviders: [],
  toResetPassword: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toSignIn: jest.fn(),
  validationErrors: undefined,
};

const { getCreatingAccountText } = authenticatorTextUtil;

describe('SignUp', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, queryByText } = render(<SignUp {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText(getCreatingAccountText())).toBe(null);
    expect(getAllByRole('text')).toHaveLength(fields.length);
  });

  it('renders as expected with errors', () => {
    const error = 'Something went wrong';
    const { toJSON, getByRole, queryByText } = render(
      <SignUp {...props} error={error} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('alert')).toBeDefined();
    expect(queryByText(error)).toBeDefined();
  });

  it('renders as expected when hideSignIn is true', () => {
    const { toJSON, queryByRole } = render(<SignUp {...props} hideSignIn />);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByRole('tab')).toBe(null);
  });

  it('renders as expected when isPending is true', () => {
    const { toJSON, queryByText } = render(<SignUp {...props} isPending />);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText(getCreatingAccountText())).toBeDefined();
  });
});
