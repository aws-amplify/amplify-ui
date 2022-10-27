import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { ConfirmResetPassword } from '..';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const newPassword = {
  name: 'newPassword',
  label: 'New Password',
  placeholder: 'New Password',
  type: 'password' as const,
};

const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'password' as const,
};

const fields = [code, newPassword, confirmPassword];

const props = {
  fields,
  Footer: ConfirmResetPassword.Footer,
  FormFields: ConfirmResetPassword.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ConfirmResetPassword.Header,
  isPending: false,
  resendCode: jest.fn(),
};

const { getSubmitText, getSubmittingText, getResendCodeText } =
  authenticatorTextUtil;

describe('ConfirmResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <ConfirmResetPassword {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getSubmitText())).toBeDefined();
    expect(getByText(getResendCodeText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(fields.length);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <ConfirmResetPassword {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('handles Resend Code button', () => {
    const resendCodeMock = jest.fn();

    const { getByText } = render(
      <ConfirmResetPassword {...props} resendCode={resendCodeMock} />
    );

    const button = getByText(getResendCodeText());
    fireEvent.press(button);
    expect(resendCodeMock).toBeCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(
      <ConfirmResetPassword {...props} isPending />
    );

    expect(queryByText(getSubmittingText())).toBeDefined();
    expect(queryByText(getSubmitText())).toBe(null);
  });
});
