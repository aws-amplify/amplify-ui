import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import ConfirmSignIn from '../../../components/Authenticator/ConfirmSignIn.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('ConfirmSignIn', () => {
  let mockStore: any;
  let mockSubmitForm: ReturnType<typeof vi.fn>;
  let mockUpdateForm: ReturnType<typeof vi.fn>;
  let mockToSignIn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSubmitForm = vi.fn();
    mockUpdateForm = vi.fn();
    mockToSignIn = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'SOFTWARE_TOKEN_MFA',
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders MFA confirmation form for TOTP', () => {
    const { getByText, getByLabelText, getByRole } = render(ConfirmSignIn);
    
    expect(getByText('Confirm Sign In')).toBeInTheDocument();
    expect(getByText('Enter your authentication code')).toBeInTheDocument();
    expect(getByLabelText('Code')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('renders SMS MFA form', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'SMS_MFA',
      codeDeliveryDetails: {
        destination: '+1XXX-XXX-1234',
        deliveryMedium: 'SMS',
      },
    }));
    
    const { getByText } = render(ConfirmSignIn);
    
    expect(getByText('Enter the code sent to your phone')).toBeInTheDocument();
    expect(getByText('A verification code has been sent to +1XXX-XXX-1234')).toBeInTheDocument();
  });

  it('renders custom challenge form', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'CUSTOM_CHALLENGE',
    }));
    
    const { getByText } = render(ConfirmSignIn);
    
    expect(getByText('Complete the challenge')).toBeInTheDocument();
  });

  it('updates form on code input', async () => {
    const { getByLabelText } = render(ConfirmSignIn);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'confirmation_code', value: '123456' });
  });

  it('submits form with confirmation code', async () => {
    const { getByLabelText, getByRole } = render(ConfirmSignIn);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      confirmation_code: '123456',
    });
  });

  it('prevents submission with empty code', () => {
    const { getByRole } = render(ConfirmSignIn);
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'SOFTWARE_TOKEN_MFA',
    }));
    
    const { getByRole } = render(ConfirmSignIn);
    const submitButton = getByRole('button', { name: 'Confirming...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Invalid code provided',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'SOFTWARE_TOKEN_MFA',
    }));
    
    const { getByRole } = render(ConfirmSignIn);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Invalid code provided');
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(ConfirmSignIn);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('shows MFA selection when multiple methods available', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'MFA_SETUP',
      allowedMfaTypes: ['SOFTWARE_TOKEN_MFA', 'SMS_MFA'],
    }));
    
    const { getByText, getByRole } = render(ConfirmSignIn);
    
    expect(getByText('Select MFA Method')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Use Authenticator App' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Use SMS' })).toBeInTheDocument();
  });

  it('handles MFA method selection', async () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'MFA_SETUP',
      allowedMfaTypes: ['SOFTWARE_TOKEN_MFA', 'SMS_MFA'],
    }));
    
    const { getByRole } = render(ConfirmSignIn);
    const totpButton = getByRole('button', { name: 'Use Authenticator App' });
    
    await fireEvent.click(totpButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({ mfaType: 'SOFTWARE_TOKEN_MFA' });
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(ConfirmSignIn);
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    
    expect(codeInput.value).toBe('');
  });

  it('shows help text for different challenge types', () => {
    const challengeTypes = [
      { 
        challengeName: 'SOFTWARE_TOKEN_MFA', 
        helpText: 'Enter the code from your authenticator app' 
      },
      { 
        challengeName: 'SMS_MFA', 
        helpText: 'Enter the code sent to your phone' 
      },
      { 
        challengeName: 'CUSTOM_CHALLENGE', 
        helpText: 'Complete the challenge' 
      },
    ];
    
    challengeTypes.forEach(({ challengeName, helpText }) => {
      mockStore.set(createMockAuthenticatorStore({
        submitForm: mockSubmitForm,
        updateForm: mockUpdateForm,
        toSignIn: mockToSignIn,
        challengeName,
      }));
      
      const { getByText } = render(ConfirmSignIn);
      expect(getByText(helpText)).toBeInTheDocument();
    });
  });
});