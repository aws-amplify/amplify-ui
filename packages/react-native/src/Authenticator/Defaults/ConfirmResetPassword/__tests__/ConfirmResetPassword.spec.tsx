import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { ConfirmResetPassword } from '..';

const props = {
  fields: [],
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
    expect(getByText(getSubmitText())).toBeTruthy();
    expect(getByText(getResendCodeText())).toBeTruthy();
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <ConfirmResetPassword {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeTruthy();
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

    expect(queryByText(getSubmittingText())).toBeTruthy();
    expect(queryByText(getSubmitText())).not.toBeTruthy();
  });
});
