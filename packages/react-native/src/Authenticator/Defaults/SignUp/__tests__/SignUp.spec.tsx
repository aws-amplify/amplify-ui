import React from 'react';
import { render } from '@testing-library/react-native';

import { SignUp } from '..';
import { DefaultFormFields } from '../../FormFields';
import { DefaultFooter, DefaultHeader } from '../../../common';

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

describe('SignUp', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(<SignUp {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
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

  it('renders as expected with social providers', () => {
    const { toJSON, queryByText } = render(
      <SignUp {...props} socialProviders={['amazon', 'facebook']} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText('amazon')).toBeDefined();
    expect(queryByText('facebook')).toBeDefined();
  });
});
