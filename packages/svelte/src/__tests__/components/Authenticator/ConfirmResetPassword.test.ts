import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import ConfirmResetPassword from '../../../components/Authenticator/ConfirmResetPassword.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('ConfirmResetPassword', () => {
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

  it('renders reset password form', () => {
    const { getByText, getByLabelText, getByRole } = render(ConfirmResetPassword);
    
    expect(getByText('Reset your password')).toBeInTheDocument();
    expect(getByText('Enter the code sent to your email along with your new password.')).toBeInTheDocument();
    expect(getByLabelText('Code')).toBeInTheDocument();
    expect(getByLabelText('New Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
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
    
    const { getByText } = render(ConfirmResetPassword);
    
    expect(getByText('A code has been sent to t***@example.com')).toBeInTheDocument();
  });

  it('updates form on code input', async () => {
    const { getByLabelText } = render(ConfirmResetPassword);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'confirmation_code', value: '123456' });
  });

  it('updates form on password input', async () => {
    const { getByLabelText } = render(ConfirmResetPassword);
    
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'password', value: 'newPassword123!' });
  });

  it('submits form with code and password', async () => {
    const { getByLabelText, getByRole } = render(ConfirmResetPassword);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Reset Password' });
    
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      confirmation_code: '123456',
      password: 'newPassword123!',
    });
  });

  it('prevents submission with empty fields', () => {
    const { getByRole } = render(ConfirmResetPassword);
    const submitButton = getByRole('button', { name: 'Reset Password' });
    
    expect(submitButton).toBeDisabled();
  });

  it('enables submission only when both fields are filled', async () => {
    const { getByLabelText, getByRole } = render(ConfirmResetPassword);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Reset Password' });
    
    // Initially disabled
    expect(submitButton).toBeDisabled();
    
    // Still disabled with only code
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    expect(submitButton).toBeDisabled();
    
    // Enabled with both fields
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    expect(submitButton).not.toBeDisabled();
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
    
    const { getByRole } = render(ConfirmResetPassword);
    const submitButton = getByRole('button', { name: 'Resetting...' });
    
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
    
    const { getByRole } = render(ConfirmResetPassword);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Invalid verification code');
  });

  it('handles resend code', async () => {
    const { getByText } = render(ConfirmResetPassword);
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
    
    const { getByText } = render(ConfirmResetPassword);
    const resendButton = getByText('Resend Code');
    
    expect(resendButton).toBeDisabled();
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(ConfirmResetPassword);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(ConfirmResetPassword);
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    
    expect(codeInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('shows validation errors', () => {
    mockStore.set(createMockAuthenticatorStore({
      hasValidationErrors: true,
      validationErrors: {
        password: ['Password must be at least 8 characters'],
      },
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      resendCode: mockResendCode,
      toSignIn: mockToSignIn,
      username: 'testuser',
    }));
    
    const { getByText } = render(ConfirmResetPassword);
    
    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });
});