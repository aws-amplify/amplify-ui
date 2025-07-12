import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import ForceNewPassword from '../../../components/Authenticator/ForceNewPassword.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('ForceNewPassword', () => {
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
      challengeName: 'NEW_PASSWORD_REQUIRED',
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders force new password form', () => {
    const { getByText, getByLabelText, getByRole } = render(ForceNewPassword);
    
    expect(getByText('Change Password')).toBeInTheDocument();
    expect(getByText('Your password has expired. Please set a new password.')).toBeInTheDocument();
    expect(getByLabelText('New Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Change Password' })).toBeInTheDocument();
    expect(getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('updates form on password input', async () => {
    const { getByLabelText } = render(ForceNewPassword);
    
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'password', value: 'newPassword123!' });
  });

  it('updates form on confirm password input', async () => {
    const { getByLabelText } = render(ForceNewPassword);
    
    const confirmInput = getByLabelText('Confirm Password') as HTMLInputElement;
    await fireEvent.input(confirmInput, { target: { value: 'newPassword123!' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'confirm_password', value: 'newPassword123!' });
  });

  it('submits form with new password', async () => {
    const { getByLabelText, getByRole } = render(ForceNewPassword);
    
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    const confirmInput = getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Change Password' });
    
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    await fireEvent.input(confirmInput, { target: { value: 'newPassword123!' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      password: 'newPassword123!',
      confirm_password: 'newPassword123!',
    });
  });

  it('prevents submission with empty fields', () => {
    const { getByRole } = render(ForceNewPassword);
    const submitButton = getByRole('button', { name: 'Change Password' });
    
    expect(submitButton).toBeDisabled();
  });

  it('enables submission only when both fields are filled', async () => {
    const { getByLabelText, getByRole } = render(ForceNewPassword);
    
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    const confirmInput = getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Change Password' });
    
    // Initially disabled
    expect(submitButton).toBeDisabled();
    
    // Still disabled with only password
    await fireEvent.input(passwordInput, { target: { value: 'newPassword123!' } });
    expect(submitButton).toBeDisabled();
    
    // Enabled with both fields
    await fireEvent.input(confirmInput, { target: { value: 'newPassword123!' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'NEW_PASSWORD_REQUIRED',
    }));
    
    const { getByRole } = render(ForceNewPassword);
    const submitButton = getByRole('button', { name: 'Changing...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Passwords do not match',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'NEW_PASSWORD_REQUIRED',
    }));
    
    const { getByRole } = render(ForceNewPassword);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Passwords do not match');
  });

  it('shows validation errors for password field', () => {
    mockStore.set(createMockAuthenticatorStore({
      hasValidationErrors: true,
      validationErrors: {
        password: ['Password must be at least 8 characters'],
      },
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'NEW_PASSWORD_REQUIRED',
    }));
    
    const { getByText } = render(ForceNewPassword);
    
    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('shows validation errors for confirm password field', () => {
    mockStore.set(createMockAuthenticatorStore({
      hasValidationErrors: true,
      validationErrors: {
        confirm_password: ['Passwords do not match'],
      },
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'NEW_PASSWORD_REQUIRED',
    }));
    
    const { getByText } = render(ForceNewPassword);
    
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(ForceNewPassword);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(ForceNewPassword);
    const passwordInput = getByLabelText('New Password') as HTMLInputElement;
    const confirmInput = getByLabelText('Confirm Password') as HTMLInputElement;
    
    expect(passwordInput.value).toBe('');
    expect(confirmInput.value).toBe('');
  });

  it('displays required password attributes when available', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      challengeName: 'NEW_PASSWORD_REQUIRED',
      unverifiedUserAttributes: {
        passwordPolicy: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
      },
    }));
    
    const { getByText } = render(ForceNewPassword);
    
    expect(getByText(/Password must meet the following requirements:/)).toBeInTheDocument();
    expect(getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(getByText(/Contains lowercase letter/)).toBeInTheDocument();
    expect(getByText(/Contains uppercase letter/)).toBeInTheDocument();
    expect(getByText(/Contains number/)).toBeInTheDocument();
    expect(getByText(/Contains special character/)).toBeInTheDocument();
  });
});