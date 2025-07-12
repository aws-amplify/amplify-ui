import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import FederatedSignIn from '../../../components/Authenticator/FederatedSignIn.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('FederatedSignIn', () => {
  let mockStore: any;
  let mockToFederatedSignIn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockToFederatedSignIn = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: ['amazon', 'apple', 'facebook', 'google'],
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders federated sign in options', () => {
    const { getByText, getByRole } = render(FederatedSignIn);
    
    expect(getByText('Or sign in with')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in with Amazon' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in with Apple' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in with Facebook' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in with Google' })).toBeInTheDocument();
  });

  it('does not render when no social providers', () => {
    mockStore.set(createMockAuthenticatorStore({
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: [],
    }));
    
    const { container } = render(FederatedSignIn);
    
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('handles Amazon sign in', async () => {
    const { getByRole } = render(FederatedSignIn);
    const amazonButton = getByRole('button', { name: 'Sign in with Amazon' });
    
    await fireEvent.click(amazonButton);
    
    expect(mockToFederatedSignIn).toHaveBeenCalledWith({ provider: 'amazon' });
  });

  it('handles Apple sign in', async () => {
    const { getByRole } = render(FederatedSignIn);
    const appleButton = getByRole('button', { name: 'Sign in with Apple' });
    
    await fireEvent.click(appleButton);
    
    expect(mockToFederatedSignIn).toHaveBeenCalledWith({ provider: 'apple' });
  });

  it('handles Facebook sign in', async () => {
    const { getByRole } = render(FederatedSignIn);
    const facebookButton = getByRole('button', { name: 'Sign in with Facebook' });
    
    await fireEvent.click(facebookButton);
    
    expect(mockToFederatedSignIn).toHaveBeenCalledWith({ provider: 'facebook' });
  });

  it('handles Google sign in', async () => {
    const { getByRole } = render(FederatedSignIn);
    const googleButton = getByRole('button', { name: 'Sign in with Google' });
    
    await fireEvent.click(googleButton);
    
    expect(mockToFederatedSignIn).toHaveBeenCalledWith({ provider: 'google' });
  });

  it('renders only available providers', () => {
    mockStore.set(createMockAuthenticatorStore({
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: ['google', 'facebook'],
    }));
    
    const { getByRole, queryByRole } = render(FederatedSignIn);
    
    expect(getByRole('button', { name: 'Sign in with Google' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign in with Facebook' })).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Sign in with Amazon' })).not.toBeInTheDocument();
    expect(queryByRole('button', { name: 'Sign in with Apple' })).not.toBeInTheDocument();
  });

  it('disables buttons when authenticator is pending', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: ['amazon', 'apple', 'facebook', 'google'],
    }));
    
    const { getByRole } = render(FederatedSignIn);
    
    expect(getByRole('button', { name: 'Sign in with Amazon' })).toBeDisabled();
    expect(getByRole('button', { name: 'Sign in with Apple' })).toBeDisabled();
    expect(getByRole('button', { name: 'Sign in with Facebook' })).toBeDisabled();
    expect(getByRole('button', { name: 'Sign in with Google' })).toBeDisabled();
  });

  it('renders correct provider icons', () => {
    const { container } = render(FederatedSignIn);
    
    // Check for provider-specific classes or icons
    const amazonButton = container.querySelector('[aria-label="Sign in with Amazon"]');
    const appleButton = container.querySelector('[aria-label="Sign in with Apple"]');
    const facebookButton = container.querySelector('[aria-label="Sign in with Facebook"]');
    const googleButton = container.querySelector('[aria-label="Sign in with Google"]');
    
    expect(amazonButton).toBeInTheDocument();
    expect(appleButton).toBeInTheDocument();
    expect(facebookButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  it('renders custom provider if provided', () => {
    mockStore.set(createMockAuthenticatorStore({
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: ['custom'],
    }));
    
    const { getByRole } = render(FederatedSignIn);
    
    expect(getByRole('button', { name: 'Sign in with Custom' })).toBeInTheDocument();
  });

  it('handles custom provider sign in', async () => {
    mockStore.set(createMockAuthenticatorStore({
      toFederatedSignIn: mockToFederatedSignIn,
      socialProviders: ['custom'],
    }));
    
    const { getByRole } = render(FederatedSignIn);
    const customButton = getByRole('button', { name: 'Sign in with Custom' });
    
    await fireEvent.click(customButton);
    
    expect(mockToFederatedSignIn).toHaveBeenCalledWith({ provider: 'custom' });
  });

  it('applies correct CSS classes', () => {
    const { container } = render(FederatedSignIn);
    
    const divider = container.querySelector('.amplify-divider');
    const buttonsContainer = container.querySelector('.amplify-federated-sign-in-container');
    
    expect(divider).toBeInTheDocument();
    expect(buttonsContainer).toBeInTheDocument();
  });
});