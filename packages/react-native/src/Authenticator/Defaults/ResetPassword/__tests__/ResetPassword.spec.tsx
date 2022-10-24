import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ResetPassword } from '..';

const props = {
  error: undefined,
  Footer: ResetPassword.Footer,
  FormFields: [] as any,
  Header: ResetPassword.Header,
  handleBlur: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  isPending: false,
  onBlur: undefined,
  onChangeText: undefined,
  onSubmit: undefined,
  toSignIn: () => {},
};

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <>
        <ResetPassword {...props} />
        <ResetPassword.Header />
        <ResetPassword.Footer />
        <ResetPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText('Send code')).toBeTruthy();
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

    const button = getByText('Back to Sign In');
    fireEvent.press(button);
    expect(toSignInMock).toBeCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<ResetPassword {...props} isPending />);

    expect(queryByText('Sending')).toBeTruthy();
    expect(queryByText('Send code')).not.toBeTruthy();
  });
});
