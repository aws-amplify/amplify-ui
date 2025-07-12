import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { createAuthenticatorStore, stopAuthenticatorService } from '../stores/authenticator';

// Mock @aws-amplify/ui
vi.mock('@aws-amplify/ui', () => ({
  createAuthenticatorMachine: vi.fn(() => ({
    // Mock machine
  })),
  getServiceFacade: vi.fn(() => ({
    authStatus: 'unauthenticated',
    route: 'signIn',
    user: undefined,
    error: '',
    isPending: false,
    hasValidationErrors: false,
    validationErrors: {},
    submitForm: vi.fn(),
    updateForm: vi.fn(),
    toSignIn: vi.fn(),
    toSignUp: vi.fn(),
    toForgotPassword: vi.fn(),
    signOut: vi.fn(),
    resendCode: vi.fn(),
    initializeMachine: vi.fn(),
    updateBlur: vi.fn(),
    toFederatedSignIn: vi.fn(),
    skipVerification: vi.fn(),
    username: '',
    challengeName: undefined,
    totpSecretCode: null,
    socialProviders: [],
    unverifiedUserAttributes: {},
    codeDeliveryDetails: {},
    allowedMfaTypes: undefined,
  })),
}));

// Mock xstate
vi.mock('xstate', () => ({
  interpret: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn(),
    getSnapshot: vi.fn(() => ({
      context: {},
      value: 'idle',
    })),
    subscribe: vi.fn(() => vi.fn()),
    send: vi.fn(),
  })),
}));

describe('Authenticator Store', () => {
  afterEach(() => {
    stopAuthenticatorService();
    vi.clearAllMocks();
  });

  it('creates a store with initial state', () => {
    const store = createAuthenticatorStore();
    const state = get(store);
    
    expect(state).toHaveProperty('authStatus', 'unauthenticated');
    expect(state).toHaveProperty('route', 'signIn');
    expect(state).toHaveProperty('user', undefined);
    expect(state).toHaveProperty('QRFields', null);
  });

  it('provides authentication methods', () => {
    const store = createAuthenticatorStore();
    const state = get(store);
    
    expect(state).toHaveProperty('submitForm');
    expect(state).toHaveProperty('updateForm');
    expect(state).toHaveProperty('toSignIn');
    expect(state).toHaveProperty('toSignUp');
    expect(state).toHaveProperty('toForgotPassword');
    expect(state).toHaveProperty('signOut');
    expect(state).toHaveProperty('resendCode');
    expect(state).toHaveProperty('initializeMachine');
  });

  it('returns the same store instance when called multiple times', () => {
    const store1 = createAuthenticatorStore();
    const store2 = createAuthenticatorStore();
    
    // Should return the same instance
    expect(store1).toBe(store2);
  });

  it('computes QR fields when totpSecretCode is present', () => {
    const mockGetServiceFacade = vi.fn(() => ({
      authStatus: 'unauthenticated',
      route: 'setupTotp',
      user: { username: 'testuser' },
      totpSecretCode: 'secret123',
      error: '',
      isPending: false,
      hasValidationErrors: false,
      validationErrors: {},
      submitForm: vi.fn(),
      updateForm: vi.fn(),
      toSignIn: vi.fn(),
      toSignUp: vi.fn(),
      toForgotPassword: vi.fn(),
      signOut: vi.fn(),
      resendCode: vi.fn(),
      initializeMachine: vi.fn(),
      updateBlur: vi.fn(),
      toFederatedSignIn: vi.fn(),
      skipVerification: vi.fn(),
      username: 'testuser',
      challengeName: undefined,
      socialProviders: [],
      unverifiedUserAttributes: {},
      codeDeliveryDetails: {},
      allowedMfaTypes: undefined,
    }));
    
    vi.mocked(await import('@aws-amplify/ui')).getServiceFacade = mockGetServiceFacade;
    
    // Need to clear the service to force recreation
    stopAuthenticatorService();
    
    const store = createAuthenticatorStore();
    const state = get(store);
    
    expect(state.QRFields).toEqual({
      totpIssuer: expect.any(String),
      totpUsername: 'testuser',
    });
  });
});