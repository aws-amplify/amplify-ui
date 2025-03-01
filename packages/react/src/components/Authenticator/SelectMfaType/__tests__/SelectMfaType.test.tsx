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

const fieldLabel = 'Email Message';
const fieldInput = { name: 'mfa_type', value: 'EMAIL' };

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

    const radioButton = await screen.findByText(fieldLabel);

    fireEvent.click(radioButton);

    expect(mockUpdateForm).toHaveBeenCalledWith(fieldInput);
  });

  it('sends submit event on form submit', async () => {
    render(<SelectMfaType {...props} />);

    const radioButton = await screen.findByText(fieldLabel);

    fireEvent.click(radioButton);

    expect(mockUseAuthenticatorOutput.updateForm).toHaveBeenCalledWith(
      fieldInput
    );

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
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
