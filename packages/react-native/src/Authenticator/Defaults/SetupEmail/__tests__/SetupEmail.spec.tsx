import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import type { ChallengeName } from '@aws-amplify/ui';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SetupEmail } from '..';

const mfaType = {
  name: 'email',
  label: 'Email',
  placeholder: 'Email',
  type: 'email' as const,
};

const fields = [mfaType];

const props = {
  challengeName: 'MFA_SETUP' as ChallengeName,
  fields,
  Footer: SetupEmail.Footer,
  FormFields: SetupEmail.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  hasValidationErrors: false,
  Header: SetupEmail.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

const {
  getBackToSignInText,
  getSetupEmailText,
  getConfirmText,
  getConfirmingText,
} = authenticatorTextUtil;

describe('SetupEmail', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SetupEmail {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getSetupEmailText())).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(3);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SetupEmail {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <SetupEmail {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toHaveBeenCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<SetupEmail {...props} isPending />);

    expect(queryByText(getConfirmingText())).toBeDefined();
    expect(queryByText(getConfirmText())).toBeNull();
  });
});
