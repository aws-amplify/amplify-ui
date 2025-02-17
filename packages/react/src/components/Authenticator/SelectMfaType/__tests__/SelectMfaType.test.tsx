import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
import { SelectMfaType } from '../SelectMfaType';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

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

const fieldLabel = 'Select MFA Type';
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
  fields: [
    {
      name: 'mfa_type',
      label: fieldLabel,
      required: true,
      type: 'radio',
      radioOptions: [
        {
          label: 'EMAIL',
          value: 'EMAIL',
        },
        {
          label: 'TOTP',
          value: 'TOTP',
        },
      ],
    },
  ],
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
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(<SelectMfaType {...props} />);
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(<SelectMfaType {...props} />);

    const radioButton = await screen.findByText(fieldInput.value);

    fireEvent.click(radioButton);

    expect(mockUpdateForm).toHaveBeenCalledWith(fieldInput);
  });

  it('sends submit event on form submit', async () => {
    render(<SelectMfaType {...props} />);

    const radioButton = await screen.findByText(fieldInput.value);

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
