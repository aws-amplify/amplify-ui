import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import ConfirmSignUp from '../../../components/Authenticator/ConfirmSignUp.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('ConfirmSignUp', () => {
  let mockStore: any;
  let mockSubmitForm: ReturnType<typeof vi.fn>;
  let mockUpdateForm: ReturnType<typeof vi.fn>;
  let mockResendCode: ReturnType<typeof vi.fn>;
  let mockToSignIn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSubmitForm = vi.fn();
    mockUpdateForm = vi.fn();
    mockResendCode = vi.fn();
    mockToSignIn = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders confirm sign up form', () => {
    const { getByText, getByLabelText, getByRole } = render(ConfirmSignUp);
    
    expect(getByText('Confirm Sign Up')).toBeInTheDocument();
    expect(getByText('Enter the confirmation code sent to your email')).toBeInTheDocument();
    expect(getByLabelText('Confirmation Code')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(getByText('Resend Code')).toBeInTheDocument();
    expect(getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('shows delivery details when available', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
      codeDeliveryDetails: {
        destination: 't***@example.com',
        deliveryMedium: 'EMAIL',
      },
    }));
    
    const { getByText } = render(ConfirmSignUp);
    
    expect(getByText('A confirmation code has been sent to t***@example.com')).toBeInTheDocument();
  });

  it('updates form on code input', async () => {
    const { getByLabelText } = render(ConfirmSignUp);
    
    const codeInput = getByLabelText('Confirmation Code') as HTMLInputElement;
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'confirmation_code', value: '123456' });
  });

  it('submits form with confirmation code', async () => {
    const { getByLabelText, getByRole } = render(ConfirmSignUp);
    
    const codeInput = getByLabelText('Confirmation Code') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      confirmation_code: '123456',
    });
  });

  it('prevents submission with empty code', () => {
    const { getByRole } = render(ConfirmSignUp);
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
    }));
    
    const { getByRole } = render(ConfirmSignUp);
    const submitButton = getByRole('button', { name: 'Confirming...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Invalid verification code',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
    }));
    
    const { getByRole } = render(ConfirmSignUp);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Invalid verification code');
  });

  it('handles resend code', async () => {
    const { getByText } = render(ConfirmSignUp);
    const resendButton = getByText('Resend Code');
    
    await fireEvent.click(resendButton);
    
    expect(mockResendCode).toHaveBeenCalled();
  });

  it('disables resend code when pending', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
    }));
    
    const { getByText } = render(ConfirmSignUp);
    const resendButton = getByText('Resend Code');
    
    expect(resendButton).toBeDisabled();
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(ConfirmSignUp);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(ConfirmSignUp);
    const codeInput = getByLabelText('Confirmation Code') as HTMLInputElement;
    
    expect(codeInput.value).toBe('');
  });
});