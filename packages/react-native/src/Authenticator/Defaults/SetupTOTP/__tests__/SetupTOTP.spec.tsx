import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SetupTOTP } from '..';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};
const fields = [code];
const toSignIn = jest.fn();

const props = {
  error: null as unknown as string,
  fields,
  Footer: SetupTOTP.Footer,
  FormFields: SetupTOTP.FormFields,
  Header: SetupTOTP.Header,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  isPending: false,
  toSignIn,
  totpSecretCode: "Let's keep it hush hush",
};

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTOTPText,
} = authenticatorTextUtil;

describe('SetupTOTP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SetupTOTP {...props} />
    );

    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getSetupTOTPText())).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SetupTOTP {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('calls toSignIn an secondary button press', () => {
    const { getByText } = render(<SetupTOTP {...props} />);

    const secondaryButton = getByText(getBackToSignInText());

    expect(secondaryButton).toBeDefined();

    fireEvent(secondaryButton, 'press');

    expect(toSignIn).toHaveBeenCalledTimes(1);
  });

  it('shows the correct submit button based on isPending', async () => {
    const { queryByText } = render(<SetupTOTP {...props} isPending />);

    await waitFor(() => {
      expect(queryByText(getConfirmingText())).toBeDefined();
      expect(queryByText(getConfirmText())).toBe(null);
    });
  });
});
