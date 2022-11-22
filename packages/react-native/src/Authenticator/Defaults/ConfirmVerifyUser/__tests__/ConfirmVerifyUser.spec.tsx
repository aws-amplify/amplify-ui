import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { ConfirmVerifyUser } from '..';

const {
  getAccountRecoveryInfoText,
  getSkipText,
  getSubmitText,
  getSubmittingText,
} = authenticatorTextUtil;

const props = {
  fields: [],
  FormFields: ConfirmVerifyUser.FormFields,
  Footer: ConfirmVerifyUser.Footer,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ConfirmVerifyUser.Header,
  isPending: false,
  skipVerification: jest.fn(),
};

describe('ConfirmVerifyUser', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole, getByText } = render(
      <ConfirmVerifyUser {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
    expect(getByText(getAccountRecoveryInfoText())).toBeDefined();
    expect(getByText(getSubmitText())).toBeDefined();
    expect(getByText(getSkipText())).toBeDefined();
  });

  it('renders as expected with errors', () => {
    const error = 'Something went wrong';
    const { toJSON, getByRole, getByText } = render(
      <ConfirmVerifyUser {...props} error={error} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('alert')).toBeDefined();
    expect(getByText(error)).toBeDefined();
  });

  it('handles skip verification button', () => {
    const skipVerificationMock = jest.fn();

    const { getByText } = render(
      <ConfirmVerifyUser {...props} skipVerification={skipVerificationMock} />
    );

    const button = getByText(getSkipText());
    fireEvent.press(button);
    expect(skipVerificationMock).toBeCalledTimes(1);
  });

  it('renders as expected when isPending is true', () => {
    const { toJSON, getByText } = render(
      <ConfirmVerifyUser {...props} isPending />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByText(getSubmittingText())).toBeDefined();
  });
});
