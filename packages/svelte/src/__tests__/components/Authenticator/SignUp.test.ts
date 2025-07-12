import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import SignUp from '../../../components/Authenticator/SignUp.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('SignUp', () => {
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

  it('renders sign up form', () => {
    const { getByLabelText, getByRole, getByText } = render(SignUp);
    
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    expect(getByText('Already have an account?')).toBeInTheDocument();
  });

  it('updates form on input', async () => {
    const { getByLabelText } = render(SignUp);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'username', value: 'testuser' });
    
    await fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'email', value: 'test@example.com' });
    
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'password', value: 'password123' });
  });

  it('validates password confirmation', async () => {
    const { getByLabelText, getByText, queryByText } = render(SignUp);
    
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password') as HTMLInputElement;
    
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    await fireEvent.input(confirmPasswordInput, { target: { value: 'password456' } });
    
    expect(getByText('Passwords do not match')).toBeInTheDocument();
    
    await fireEvent.input(confirmPasswordInput, { target: { value: 'password123' } });
    expect(queryByText('Passwords do not match')).not.toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByLabelText, getByRole } = render(SignUp);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Create Account' });
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    await fireEvent.input(confirmPasswordInput, { target: { value: 'password123' } });
    
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com',
    });
  });

  it('prevents submission when passwords do not match', async () => {
    const { getByLabelText, getByRole } = render(SignUp);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Create Account' });
    
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });
    await fireEvent.input(confirmPasswordInput, { target: { value: 'password456' } });
    
    expect(submitButton).toBeDisabled();
    await fireEvent.click(submitButton);
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  it('prevents submission with empty fields', () => {
    const { getByRole } = render(SignUp);
    const submitButton = getByRole('button', { name: 'Create Account' });
    
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
    }));
    
    const { getByRole } = render(SignUp);
    const submitButton = getByRole('button', { name: 'Creating account...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Username already exists',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
    }));
    
    const { getByRole } = render(SignUp);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Username already exists');
    expect(alert).toHaveClass('amplify-alert--error');
  });

  it('displays validation errors', () => {
    mockStore.set(createMockAuthenticatorStore({
      validationErrors: {
        username: 'Username must be at least 3 characters',
        email: 'Invalid email format',
        password: 'Password must contain a number',
      },
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
    }));
    
    const { getByText } = render(SignUp);
    
    expect(getByText('Username must be at least 3 characters')).toBeInTheDocument();
    expect(getByText('Invalid email format')).toBeInTheDocument();
    expect(getByText('Password must contain a number')).toBeInTheDocument();
  });

  it('navigates to sign in', async () => {
    const { getByText } = render(SignUp);
    const signInLink = getByText('Sign in');
    
    await fireEvent.click(signInLink);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(SignUp);
    
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password') as HTMLInputElement;
    
    expect(usernameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');
  });
});