import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ResetPassword } from '..';

const props = { Header: () => null, Footer: () => null } as any;

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(
      <>
        <ResetPassword {...props} />
        <ResetPassword.Header />
        <ResetPassword.Footer />
        <ResetPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
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
});
