import React from 'react';
import { render } from '@testing-library/react-native';

import SignIn from '../SignIn';

const props = {
  fields: [],
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
    const { toJSON, getByRole, getAllByRole } = render(<SignIn {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('tab')).toHaveLength(2);
    expect(getByRole('header')).toBeDefined();
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

  it('renders as expected with socialProviders', () => {
    const { toJSON, getByText } = render(
      <SignIn {...props} socialProviders={['amazon', 'facebook']} />
    );

    expect(getByText('Sign In with Amazon')).toBeDefined();
    expect(getByText('Sign In with Facebook')).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });
});
