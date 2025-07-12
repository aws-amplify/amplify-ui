import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import SignIn from '../../../components/Authenticator/SignIn.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('SignIn', () => {
  let mockStore: any;
  let mockSubmitForm: ReturnType<typeof vi.fn>;
  let mockUpdateForm: ReturnType<typeof vi.fn>;
  let mockToForgotPassword: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSubmitForm = vi.fn();
    mockUpdateForm = vi.fn();
    mockToForgotPassword = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toForgotPassword: mockToForgotPassword,
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders sign in form', () => {
    const { getByLabelText, getByRole, getByText } = render(SignIn);
    
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(getByText('Forgot your password?')).toBeInTheDocument();
  });

  it('updates form on input', async () => {
    const { getByLabelText } = render(SignIn);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'username', value: 'testuser' });
    
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'password', value: 'password123' });
  });

  it('calls updateForm on blur', async () => {
    const { getByLabelText } = render(SignIn);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.blur(usernameInput);
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'username', value: 'testuser' });
  });

  it('submits form with username and password', async () => {
    const { getByLabelText, getByRole } = render(SignIn);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Sign in' });
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });

  it('prevents form submission with empty fields', async () => {
    const { getByRole } = render(SignIn);
    const submitButton = getByRole('button', { name: 'Sign in' });
    
    expect(submitButton).toBeDisabled();
    
    await fireEvent.click(submitButton);
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  it('shows loading state when submitting', async () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toForgotPassword: mockToForgotPassword,
    }));
    
    const { getByRole } = render(SignIn);
    const submitButton = getByRole('button', { name: 'Signing in...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Invalid username or password',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toForgotPassword: mockToForgotPassword,
    }));
    
    const { getByRole } = render(SignIn);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Invalid username or password');
    expect(alert).toHaveClass('amplify-alert--error');
  });

  it('displays validation errors', () => {
    mockStore.set(createMockAuthenticatorStore({
      validationErrors: {
        username: 'Username is required',
        password: 'Password must be at least 8 characters',
      },
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toForgotPassword: mockToForgotPassword,
    }));
    
    const { getByText } = render(SignIn);
    
    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('navigates to forgot password', async () => {
    const { getByText } = render(SignIn);
    const forgotPasswordLink = getByText('Forgot your password?');
    
    await fireEvent.click(forgotPasswordLink);
    
    expect(mockToForgotPassword).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(SignIn);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });
});