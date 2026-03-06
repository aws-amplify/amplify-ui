import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import {
  associateWebAuthnCredential,
  listWebAuthnCredentials,
} from 'aws-amplify/auth';

import { PasskeyPrompt } from '../PasskeyPrompt';

jest.mock('@aws-amplify/ui-react-core');
jest.mock('aws-amplify/auth');
jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
    },
  }),
}));

const mockSubmitForm = jest.fn();
const mockUseAuthenticator = jest.mocked(useAuthenticator);
const mockAssociateWebAuthnCredential = jest.mocked(
  associateWebAuthnCredential
);
const mockListWebAuthnCredentials = jest.mocked(listWebAuthnCredentials);

const mockUseAuthenticatorOutput = {
  submitForm: mockSubmitForm,
  isPending: false,
};

mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);

describe('PasskeyPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAssociateWebAuthnCredential.mockReset();
    mockListWebAuthnCredentials.mockReset();
    mockListWebAuthnCredentials.mockResolvedValue({ credentials: [] });
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);
    mockUseAuthenticatorOutput.isPending = false;
    mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);
  });

  it('renders initial prompt', () => {
    const { container } = render(
      <PasskeyPrompt className="" variation="default" />
    );
    expect(container).toMatchSnapshot();
  });

  it('shows registration prompt with correct text', () => {
    render(<PasskeyPrompt className="" variation="default" />);
    expect(screen.getByText('Sign in faster with Passkey')).toBeInTheDocument();
    expect(
      screen.getByText(/Passkeys are WebAuthn credentials/)
    ).toBeInTheDocument();
  });

  it('shows Create a Passkey button', () => {
    render(<PasskeyPrompt className="" variation="default" />);
    expect(screen.getByText('Create a Passkey')).toBeInTheDocument();
  });

  it('shows Continue without a Passkey button', () => {
    render(<PasskeyPrompt className="" variation="default" />);
    expect(screen.getByText('Continue without a Passkey')).toBeInTheDocument();
  });

  it('calls submitForm with SKIP when skip button clicked', () => {
    render(<PasskeyPrompt className="" variation="default" />);

    const skipButton = screen.getByText('Continue without a Passkey');
    fireEvent.click(skipButton);

    expect(mockSubmitForm).toHaveBeenCalledWith({ type: 'SKIP' });
  });

  it('calls associateWebAuthnCredential when register button clicked', async () => {
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockAssociateWebAuthnCredential).toHaveBeenCalledTimes(1);
    });
  });

  it('shows loading state during registration', async () => {
    let resolveRegistration: any;
    mockAssociateWebAuthnCredential.mockImplementation(() => {
      return new Promise((resolve) => {
        resolveRegistration = resolve;
      });
    });

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    // Should show loading state
    expect(await screen.findByText('Registering')).toBeInTheDocument();

    // Resolve the promise
    resolveRegistration();
  });

  it('shows success screen after successful registration', async () => {
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText('Passkey created successfully!')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText('Your passkey has been successfully registered.')
    ).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders success screen snapshot', async () => {
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);

    const { container } = render(
      <PasskeyPrompt className="" variation="default" />
    );

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText('Passkey created successfully!')
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('calls submitForm with SUBMIT when continue button clicked', async () => {
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(mockSubmitForm).toHaveBeenCalledWith({ type: 'SUBMIT' });
  });

  it('handles registration error and displays it', async () => {
    mockAssociateWebAuthnCredential.mockRejectedValue(
      new Error('Registration failed')
    );

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to create passkey/i)).toBeInTheDocument();
    });
  });

  it('disables buttons when isPending is true', () => {
    mockUseAuthenticator.mockReturnValue({
      ...mockUseAuthenticatorOutput,
      isPending: true,
    } as any);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByRole('button', {
      name: /create a passkey/i,
    });
    const skipButton = screen.getByText('Continue without a Passkey');

    expect(registerButton).toBeDisabled();
    expect(skipButton).toBeDisabled();
  });

  it('loads and displays existing passkeys after successful registration', async () => {
    const mockCredentials = {
      credentials: [
        {
          credentialId: 'cred1',
          friendlyCredentialName: 'My Phone',
          createdAt: new Date('2024-01-01'),
          relyingPartyId: 'example.com',
          authenticatorTransports: ['internal'],
        },
        {
          credentialId: 'cred2',
          friendlyCredentialName: undefined,
          createdAt: new Date('2024-01-02'),
          relyingPartyId: 'example.com',
          authenticatorTransports: ['internal'],
        },
      ],
    };

    mockListWebAuthnCredentials.mockResolvedValue(mockCredentials as any);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText('Passkey created successfully!')
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Existing Passkeys')).toBeInTheDocument();
    });

    expect(screen.getByText('My Phone')).toBeInTheDocument();
    expect(screen.getByText('Passkey 2')).toBeInTheDocument();
  });

  it('shows Setup another Passkey button on success screen', async () => {
    mockAssociateWebAuthnCredential.mockResolvedValue(undefined);

    render(<PasskeyPrompt className="" variation="default" />);

    const registerButton = screen.getByText('Create a Passkey');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Setup another Passkey')).toBeInTheDocument();
    });
  });
});
