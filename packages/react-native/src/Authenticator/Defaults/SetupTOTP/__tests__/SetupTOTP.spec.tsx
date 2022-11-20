import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SetupTOTP } from '..';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';

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
  getTotpSecretCode: jest.fn() as unknown as GetTotpSecretCode,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  isPending: false,
  toSignIn,
};

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTOTPText,
} = authenticatorTextUtil;

const SECRET_KEY = 'secretKey';
const mockGetTotpSecretCode = jest.fn().mockResolvedValue(SECRET_KEY);

describe('SetupTOTP', () => {
  it('renders as expected', async () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SetupTOTP {...props} />
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();

      expect(getAllByRole('header')).toBeDefined();
      expect(getByText(getSetupTOTPText())).toBeDefined();
      expect(getByText(getConfirmText())).toBeDefined();
      expect(getAllByRole('text')).toHaveLength(fields.length);
    });
  });

  it('renders an error message', async () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SetupTOTP {...props} error={errorMessage} />
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
      expect(getByText(errorMessage)).toBeDefined();
    });
  });

  it('calls toSignIn an secondary button press', async () => {
    const errorMessage = 'Test error message';
    const { getByText } = render(<SetupTOTP {...props} error={errorMessage} />);
    await waitFor(() => {
      const secondaryButton = getByText(getBackToSignInText());

      expect(secondaryButton).toBeDefined();

      fireEvent(secondaryButton, 'press');

      expect(toSignIn).toHaveBeenCalledTimes(1);
    });
  });

  it('shows the correct submit button based on isPending', async () => {
    const { queryByText } = render(<SetupTOTP {...props} isPending />);

    await waitFor(() => {
      expect(queryByText(getConfirmingText())).toBeDefined();
      expect(queryByText(getConfirmText())).toBe(null);
    });
  });

  it('handles secret code generation as expected', async () => {
    const { queryByText, rerender } = render(
      <SetupTOTP {...props} getTotpSecretCode={mockGetTotpSecretCode} />
    );
    await waitFor(async () => {
      expect(mockGetTotpSecretCode).toHaveBeenCalledTimes(1);
      expect(queryByText(SECRET_KEY)).toBeDefined();
      expect(queryByText(SECRET_KEY)?.props.selectable).toBe(true);

      rerender(
        <SetupTOTP {...props} getTotpSecretCode={mockGetTotpSecretCode} />
      );
      await waitFor(() => {
        expect(mockGetTotpSecretCode).toHaveBeenCalledTimes(1);
      });
    });
  });
});
