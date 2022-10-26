import React from 'react';
import { render } from '@testing-library/react-native';

import { SignUp } from '..';
import { DefaultFormFields } from '../../../common/DefaultFormFields';
import { DefaultFooter, DefaultHeader } from '../../../common';
import { authenticatorTextUtil } from '@aws-amplify/ui';

const props = {
  fields: [],
  FormFields: DefaultFormFields,
  Footer: DefaultFooter,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: DefaultHeader,
  isPending: false,
  socialProviders: [],
  toResetPassword: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toSignIn: jest.fn(),
};

const { getCreatingAccountText } = authenticatorTextUtil;

describe('SignUp', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByRole, queryByText } = render(
      <SignUp {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
    expect(getAllByRole('tab')).toHaveLength(2);
    expect(queryByText(getCreatingAccountText())).toBe(null);
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

  it('renders as expected with social providers', () => {
    const { toJSON, queryByText } = render(
      <SignUp
        {...props}
        socialProviders={['amazon', 'apple', 'facebook', 'google']}
      />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText('amazon')).toBeDefined();
    expect(queryByText('apple')).toBeDefined();
    expect(queryByText('facebook')).toBeDefined();
    expect(queryByText('google')).toBeDefined();
  });

  it('renders as expected when isPending is true', () => {
    const { toJSON, queryByText } = render(<SignUp {...props} isPending />);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText(getCreatingAccountText())).toBeDefined();
  });
});
