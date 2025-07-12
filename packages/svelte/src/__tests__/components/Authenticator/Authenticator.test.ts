import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import Authenticator from '../../../components/Authenticator/Authenticator.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');

describe('Authenticator', () => {
  let mockStore: any;
  let mockInitializeMachine: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockInitializeMachine = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      initializeMachine: mockInitializeMachine,
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('initializes machine on mount', () => {
    render(Authenticator);
    
    expect(mockInitializeMachine).toHaveBeenCalledWith({
      initialRoute: undefined,
      socialProviders: undefined,
    });
  });

  it('initializes machine with props', () => {
    render(Authenticator, {
      props: {
        initialRoute: 'signUp',
        socialProviders: ['google', 'facebook'],
      },
    });
    
    expect(mockInitializeMachine).toHaveBeenCalledWith({
      initialRoute: 'signUp',
      socialProviders: ['google', 'facebook'],
    });
  });

  it('renders sign in form when route is signIn', () => {
    mockStore.set(createMockAuthenticatorStore({
      route: 'signIn',
      initializeMachine: mockInitializeMachine,
    }));
    
    const { container, getByText } = render(Authenticator);
    
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Create Account')).toBeInTheDocument();
    expect(container.querySelector('[data-amplify-authenticator-signin]')).toBeInTheDocument();
  });

  it('renders sign up form when route is signUp', () => {
    mockStore.set(createMockAuthenticatorStore({
      route: 'signUp',
      initializeMachine: mockInitializeMachine,
    }));
    
    const { container } = render(Authenticator);
    
    expect(container.querySelector('[data-amplify-authenticator-signup]')).toBeInTheDocument();
  });

  it('hides sign up tab when hideSignUp is true', () => {
    mockStore.set(createMockAuthenticatorStore({
      route: 'signIn',
      initializeMachine: mockInitializeMachine,
    }));
    
    const { queryByText } = render(Authenticator, {
      props: {
        hideSignUp: true,
      },
    });
    
    expect(queryByText('Create Account')).not.toBeInTheDocument();
  });

  it('renders authenticated content when user is authenticated', () => {
    const mockUser = { username: 'testuser', userId: '123' };
    const mockSignOut = vi.fn();
    
    mockStore.set(createMockAuthenticatorStore({
      authStatus: 'authenticated',
      user: mockUser,
      signOut: mockSignOut,
      initializeMachine: mockInitializeMachine,
    }));
    
    const { getByText } = render(Authenticator, {
      props: {
        $$slots: {
          default: [
            ({ authStatus, user, signOut }) => ({
              getElement: () => {
                const div = document.createElement('div');
                div.innerHTML = `
                  <h1>Welcome ${user.username}</h1>
                  <p>Status: ${authStatus}</p>
                  <button onclick="${signOut}">Sign Out</button>
                `;
                return div;
              },
            }),
          ],
        },
      },
    });
    
    expect(getByText('Welcome testuser')).toBeInTheDocument();
    expect(getByText('Status: authenticated')).toBeInTheDocument();
  });

  it('renders different routes correctly', () => {
    const routes = [
      { route: 'confirmSignIn', selector: '[data-amplify-authenticator-confirmsignin]' },
      { route: 'confirmSignUp', selector: '[data-amplify-authenticator-confirmsignup]' },
      { route: 'forgotPassword', selector: '[data-amplify-authenticator-forgotpassword]' },
      { route: 'confirmResetPassword', selector: '[data-amplify-authenticator-confirmresetpassword]' },
      { route: 'setupTotp', selector: '[data-amplify-authenticator-setuptotp]' },
      { route: 'forceNewPassword', selector: '[data-amplify-authenticator-forcenewpassword]' },
    ];
    
    routes.forEach(({ route, selector }) => {
      mockStore.set(createMockAuthenticatorStore({
        route,
        initializeMachine: mockInitializeMachine,
      }));
      
      const { container } = render(Authenticator);
      expect(container.querySelector(selector)).toBeInTheDocument();
    });
  });

  it('shows loading state for unknown routes', () => {
    mockStore.set(createMockAuthenticatorStore({
      route: 'unknownRoute' as any,
      initializeMachine: mockInitializeMachine,
    }));
    
    const { getByText } = render(Authenticator);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(Authenticator);
    
    const authenticator = container.querySelector('.amplify-authenticator');
    expect(authenticator).toBeInTheDocument();
    expect(authenticator).toHaveAttribute('data-amplify-authenticator');
    
    const containerEl = container.querySelector('.amplify-authenticator__container');
    expect(containerEl).toBeInTheDocument();
  });

  it('switches between sign in and sign up tabs', () => {
    const mockToSignIn = vi.fn();
    const mockToSignUp = vi.fn();
    
    mockStore.set(createMockAuthenticatorStore({
      route: 'signIn',
      toSignIn: mockToSignIn,
      toSignUp: mockToSignUp,
      initializeMachine: mockInitializeMachine,
    }));
    
    const { getByText } = render(Authenticator);
    
    const signInTab = getByText('Sign In');
    const signUpTab = getByText('Create Account');
    
    expect(signInTab).toHaveClass('amplify-tabs__item--active');
    expect(signUpTab).not.toHaveClass('amplify-tabs__item--active');
  });
});