import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { TextFieldOptionsType } from '../../../hooks';
import { ForceNewPassword } from '..';

const props = {
  fields: [{ name: 'password', type: 'password' } as TextFieldOptionsType],
  Footer: ForceNewPassword.Footer,
  FormFields: ForceNewPassword.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ForceNewPassword.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

describe('ForceNewPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getAllByText } = render(
      <ForceNewPassword {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getAllByText(getChangePasswordText())).toBeTruthy();
    expect(getAllByText(getBackToSignInText())).toBeTruthy();
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <ForceNewPassword {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <ForceNewPassword {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toBeCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<ForceNewPassword {...props} isPending />);

    expect(queryByText(getChangingText())).toBeTruthy();
  });

  it('renders as expected with validationErrors', () => {
    const { toJSON, getByText } = render(
      <ForceNewPassword
        {...props}
        isPending
        validationErrors={{ password: ['error', 'another error'] }}
      />
    );

    expect(toJSON()).toMatchSnapshot();

    expect(getByText('error')).toBeDefined();
    expect(getByText('another error')).toBeDefined();
  });
});
