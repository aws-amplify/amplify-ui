import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import ForgotPassword from '../../../components/Authenticator/ForgotPassword.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('ForgotPassword', () => {
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
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders forgot password form', () => {
    const { getByText, getByLabelText, getByRole } = render(ForgotPassword);
    
    expect(getByText('Reset your password')).toBeInTheDocument();
    expect(getByText("Enter your username and we'll send you instructions to reset your password.")).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Send Code' })).toBeInTheDocument();
    expect(getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('updates form on username input', async () => {
    const { getByLabelText } = render(ForgotPassword);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'username', value: 'testuser' });
  });

  it('submits form with username', async () => {
    const { getByLabelText, getByRole } = render(ForgotPassword);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Send Code' });
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      username: 'testuser',
    });
  });

  it('prevents submission with empty username', () => {
    const { getByRole } = render(ForgotPassword);
    const submitButton = getByRole('button', { name: 'Send Code' });
    
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
    }));
    
    const { getByRole } = render(ForgotPassword);
    const submitButton = getByRole('button', { name: 'Sending...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'User not found',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
    }));
    
    const { getByRole } = render(ForgotPassword);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('User not found');
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(ForgotPassword);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(ForgotPassword);
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    
    expect(usernameInput.value).toBe('');
  });
});