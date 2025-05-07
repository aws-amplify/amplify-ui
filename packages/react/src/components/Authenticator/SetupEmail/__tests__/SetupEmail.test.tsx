import * as React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { SetupEmail } from '../SetupEmail';

jest.mock('@aws-amplify/ui-react-core');

jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
      SetupEmail: { Header: () => null, Footer: () => null },
    },
  }),
}));

const fieldLabel = 'Seteup Email';
const fieldInput = { name: 'email', value: 'user@example.com' };

const mockUpdateForm = jest.fn();
const mockSubmitForm = jest.fn();
const mockToSignIn = jest.fn();

const mockUseAuthenticator = jest.mocked(useAuthenticator);

const mockUseAuthenticatorOutput: Partial<UseAuthenticator> = {
  authStatus: 'authenticated',
  challengeName: 'MFA_SETUP',
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
  route: 'setupEmail',
  submitForm: mockSubmitForm,
  toSignIn: mockToSignIn,
  updateForm: mockUpdateForm,
  validationErrors: {} as AuthenticatorServiceFacade['validationErrors'],
  fields: [
    {
      name: 'email',
      label: fieldLabel,
      required: true,
      type: 'email',
    },
  ],
};

mockUseAuthenticator.mockReturnValue(mockUseAuthenticatorOutput as any);

const props = {
  className: '',
  variation: 'default' as const,
};

describe('SetupEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected ', () => {
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(<SetupEmail {...props} />);
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(<SetupEmail {...props} />);

    const emailField = await screen.findByLabelText(fieldLabel);

    fireEvent.input(emailField, { target: fieldInput });

    expect(mockUpdateForm).toHaveBeenCalledWith(fieldInput);
  });

  it('sends submit event on form submit', async () => {
    render(<SetupEmail {...props} />);

    const emailField = await screen.findByLabelText(fieldLabel);

    fireEvent.input(emailField, { target: fieldInput });

    expect(mockUpdateForm).toHaveBeenCalledWith(fieldInput);

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });

    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  });

  it('displays error if present', async () => {
    mockUseAuthenticator.mockReturnValue({
      ...mockUseAuthenticatorOutput,
      error: 'mockError',
    } as any);

    render(<SetupEmail {...props} />);

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    render(<SetupEmail {...props} />);

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

    render(<SetupEmail {...props} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Confirming',
    });

    expect(submitButton).toBeDisabled();
  });
});
