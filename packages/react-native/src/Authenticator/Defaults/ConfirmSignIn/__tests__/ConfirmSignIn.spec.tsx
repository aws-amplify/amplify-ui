import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AuthChallengeName, authenticatorTextUtil } from '@aws-amplify/ui';

import { ConfirmSignIn } from '..';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const fields = [code];

const props = {
  challengeName: 'SMS_MFA' as AuthChallengeName,
  fields,
  Footer: ConfirmSignIn.Footer,
  FormFields: ConfirmSignIn.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ConfirmSignIn.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

const {
  getBackToSignInText,
  getChallengeText,
  getConfirmText,
  getConfirmingText,
} = authenticatorTextUtil;

describe('ConfirmSignIn', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <ConfirmSignIn {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getChallengeText('SMS_MFA'))).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(fields.length);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <ConfirmSignIn {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <ConfirmSignIn {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toBeCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<ConfirmSignIn {...props} isPending />);

    expect(queryByText(getConfirmingText())).toBeDefined();
    expect(queryByText(getConfirmText())).toBe(null);
  });
});
