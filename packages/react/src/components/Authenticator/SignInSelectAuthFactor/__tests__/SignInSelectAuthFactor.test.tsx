import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { SignInSelectAuthFactor } from '../SignInSelectAuthFactor';

jest.mock('@aws-amplify/ui-react-core');
jest.mock('../../hooks/useFormHandlers', () => ({
  useFormHandlers: () => ({
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  }),
}));
jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
    },
  }),
}));

const mockSubmitForm = jest.fn();
const mockSelectAuthMethod = jest.fn();
const mockToSignIn = jest.fn();
const mockUseAuthenticator = jest.mocked(useAuthenticator);

const mockUseAuthenticatorOutput: Partial<UseAuthenticator> = {
  username: 'testuser',
  availableAuthMethods: ['PASSWORD', 'EMAIL_OTP'],
  isPending: false,
  toSignIn: mockToSignIn,
  submitForm: mockSubmitForm,
  selectAuthMethod: mockSelectAuthMethod,
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
};

mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);

describe('SignInSelectAuthFactor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);
  });

  it('renders with password and email OTP options', () => {
    const { container } = render(
      <SignInSelectAuthFactor className="" variation="default" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with all auth methods', () => {
    const updatedOutput = {
      ...mockUseAuthenticatorOutput,
      availableAuthMethods: ['PASSWORD', 'EMAIL_OTP', 'SMS_OTP', 'WEB_AUTHN'],
    };
    mockUseAuthenticator.mockReturnValue(updatedOutput as any);

    const { container } = render(
      <SignInSelectAuthFactor className="" variation="default" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with only passwordless methods', () => {
    const updatedOutput = {
      ...mockUseAuthenticatorOutput,
      availableAuthMethods: ['EMAIL_OTP', 'SMS_OTP'],
    };
    mockUseAuthenticator.mockReturnValue(updatedOutput as any);

    const { container } = render(
      <SignInSelectAuthFactor className="" variation="default" />
    );
    expect(container).toMatchSnapshot();
  });

  it('shows email OTP button', () => {
    render(<SignInSelectAuthFactor className="" variation="default" />);
    expect(screen.getByText('Sign In with Email')).toBeInTheDocument();
  });

  it('shows SMS OTP button when available', () => {
    const updatedOutput = {
      ...mockUseAuthenticatorOutput,
      availableAuthMethods: ['PASSWORD', 'SMS_OTP'],
    };
    mockUseAuthenticator.mockReturnValue(updatedOutput as any);

    render(<SignInSelectAuthFactor className="" variation="default" />);
    expect(screen.getByText('Sign In with SMS')).toBeInTheDocument();
  });

  it('shows passkey button when available', () => {
    const updatedOutput = {
      ...mockUseAuthenticatorOutput,
      availableAuthMethods: ['PASSWORD', 'WEB_AUTHN'],
    };
    mockUseAuthenticator.mockReturnValue(updatedOutput as any);

    render(<SignInSelectAuthFactor className="" variation="default" />);
    expect(screen.getByText('Sign In with Passkey')).toBeInTheDocument();
  });

  it('calls selectAuthMethod when passwordless button clicked', () => {
    render(<SignInSelectAuthFactor className="" variation="default" />);

    const emailButton = screen.getByText('Sign In with Email');
    fireEvent.click(emailButton);

    expect(mockSelectAuthMethod).toHaveBeenCalledWith({ method: 'EMAIL_OTP' });
  });

  it('calls toSignIn when Back to Sign In is clicked', () => {
    render(<SignInSelectAuthFactor className="" variation="default" />);

    const backLink = screen.getByText('Back to Sign In');
    fireEvent.click(backLink);

    expect(mockToSignIn).toHaveBeenCalledTimes(1);
  });
});
