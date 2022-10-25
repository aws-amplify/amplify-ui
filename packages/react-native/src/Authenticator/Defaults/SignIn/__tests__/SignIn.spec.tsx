import React from 'react';
import { render } from '@testing-library/react-native';

import {
  DefaultFooter,
  DefaultFormFields,
  DefaultHeader,
} from '../../../common';
import SignIn from '../SignIn';

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
  toSignUp: jest.fn(),
};

describe('SignIn', () => {
  it('primary component renders as expected', () => {
    const { toJSON, getByRole, getAllByRole } = render(<SignIn {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('tab')).toHaveLength(2);
    expect(getByRole('header')).toBeDefined();
  });

  it('primary component renders as expected with an error', () => {
    const error = 'An error!';
    const { getByRole, getByText, toJSON } = render(
      <SignIn {...props} error={error} />
    );

    expect(getByRole('alert')).toBeDefined();
    expect(getByText(error)).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('primary component renders as expected when hideSignUp is true', () => {
    const { toJSON } = render(<SignIn {...props} hideSignUp />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('primary component renders as expected with socialProviders', () => {
    const { toJSON } = render(
      <SignIn {...props} socialProviders={['amazon', 'facebook']} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('primary component renders as expected when socialProviders is undefined', () => {
    const { toJSON } = render(
      <SignIn {...props} socialProviders={undefined} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
