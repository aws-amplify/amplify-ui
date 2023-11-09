import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SetupTotp } from '..';

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
  Footer: SetupTotp.Footer,
  FormFields: SetupTotp.FormFields,
  Header: SetupTotp.Header,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  hasValidationErrors: false,
  isPending: false,
  toSignIn,
  totpSecretCode: "Let's keep it hush hush",
  username: 'Terry',
};

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTotpText,
} = authenticatorTextUtil;

describe('SetupTotp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SetupTotp {...props} />
    );

    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getSetupTotpText())).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SetupTotp {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('calls toSignIn an secondary button press', () => {
    const { getByText } = render(<SetupTotp {...props} />);

    const secondaryButton = getByText(getBackToSignInText());

    expect(secondaryButton).toBeDefined();

    fireEvent(secondaryButton, 'press');

    expect(toSignIn).toHaveBeenCalledTimes(1);
  });

  it('shows the correct submit button based on isPending', async () => {
    const { queryByText } = render(<SetupTotp {...props} isPending />);

    await waitFor(() => {
      expect(queryByText(getConfirmingText())).toBeDefined();
      expect(queryByText(getConfirmText())).toBe(null);
    });
  });
});
