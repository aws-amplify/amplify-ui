import * as React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { SelectMfaType } from '../SelectMfaType';

jest.mock('@aws-amplify/ui-react-core');

jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
      SelectMfaType: { Header: () => null, Footer: () => null },
    },
  }),
}));

const fieldName = 'mfa_type';
const emailRadioLabel = 'Email Message';
const totpRadioLabel = 'Authenticator App (TOTP)';
const emailFieldInput = { name: fieldName, value: 'EMAIL' };
const totpFieldInput = { name: fieldName, value: 'TOTP' };

const mockUpdateForm = jest.fn();
const mockSubmitForm = jest.fn();
const mockToSignIn = jest.fn();

const mockUseAuthenticator = jest.mocked(useAuthenticator);

const mockUseAuthenticatorOutput: Partial<UseAuthenticator> = {
  authStatus: 'authenticated',
  challengeName: 'SELECT_MFA_TYPE',
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
  route: 'selectMfaType',
  submitForm: mockSubmitForm,
  toSignIn: mockToSignIn,
  updateForm: mockUpdateForm,
  allowedMfaTypes: ['EMAIL', 'TOTP'],
  validationErrors: {} as AuthenticatorServiceFacade['validationErrors'],
};

mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);

const props = {
  className: '',
  variation: 'default' as const,
};

describe('SelectMfaType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected ', () => {
    const { container } = render(<SelectMfaType {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('sends change event on form input', async () => {
    render(<SelectMfaType {...props} />);

    const totpRadioButton = await screen.findByText(totpRadioLabel);

    fireEvent.click(totpRadioButton);

    expect(mockUpdateForm).toHaveBeenCalledWith(totpFieldInput);

    const emailRadioButton = await screen.findByText(emailRadioLabel);

    fireEvent.click(emailRadioButton);

    expect(mockUpdateForm).toHaveBeenCalledWith(emailFieldInput);
  });

  it('sends submit event on form submit with default', async () => {
    render(<SelectMfaType {...props} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith({
      [emailFieldInput.name]: emailFieldInput.value,
    });
  });

  it('sends submit event on form submit with selection', async () => {
    render(<SelectMfaType {...props} />);

    const totpRadioButton = await screen.findByText(totpRadioLabel);

    fireEvent.click(totpRadioButton);

    expect(mockUseAuthenticatorOutput.updateForm).toHaveBeenCalledWith(
      totpFieldInput
    );

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });

    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith({
      [totpFieldInput.name]: totpFieldInput.value,
    });
  });

  it('displays error if present', async () => {
    mockUseAuthenticator.mockReturnValue({
      ...mockUseAuthenticatorOutput,
      error: 'mockError',
    } as any);

    render(<SelectMfaType {...props} />);

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    render(<SelectMfaType {...props} />);

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });

    fireEvent.click(backToSignInButton);

    expect(mockToSignIn).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if confirmation is pending', async () => {
    mockUseAuthenticator.mockReturnValue({
      ...mockUseAuthenticatorOutput,
      isPending: true,
    } as any);

    render(<SelectMfaType {...props} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Confirming',
    });

    expect(submitButton).toBeDisabled();
  });
});
