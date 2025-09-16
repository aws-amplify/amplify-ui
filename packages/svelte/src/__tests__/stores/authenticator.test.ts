import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { 
  createAuthenticatorStore, 
  useAuthenticator, 
  stopAuthenticatorService 
} from '../../stores/authenticator';
import type { AuthMachineState } from '@aws-amplify/ui';

// Mock @aws-amplify/ui
const mockCreateAuthenticatorMachine = vi.fn();
const mockGetServiceFacade = vi.fn();
const mockInterpret = vi.fn();
const mockService = {
  start: vi.fn().mockReturnThis(),
  stop: vi.fn(),
  getSnapshot: vi.fn(),
  subscribe: vi.fn(),
  send: vi.fn(),
};

vi.mock('@aws-amplify/ui', () => ({
  createAuthenticatorMachine: () => mockCreateAuthenticatorMachine(),
  getServiceFacade: (args: any) => mockGetServiceFacade(args),
}));

vi.mock('xstate', () => ({
  interpret: () => {
    mockInterpret();
    return mockService;
  },
}));

describe('Authenticator Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stopAuthenticatorService();
    
    // Setup default mock returns
    mockCreateAuthenticatorMachine.mockReturnValue({});
    mockService.getSnapshot.mockReturnValue({
      value: 'signIn',
      context: {},
    });
    mockService.subscribe.mockImplementation((callback) => {
      // Return unsubscribe function
      return vi.fn();
    });
    mockGetServiceFacade.mockReturnValue({
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
    });
  });

  afterEach(() => {
    stopAuthenticatorService();
  });

  describe('createAuthenticatorStore', () => {
    it('creates a store with initial state', () => {
      const store = createAuthenticatorStore();
      const state = get(store);
      
      expect(mockCreateAuthenticatorMachine).toHaveBeenCalled();
      expect(mockInterpret).toHaveBeenCalled();
      expect(mockService.start).toHaveBeenCalled();
      expect(state).toHaveProperty('authStatus', 'unauthenticated');
      expect(state).toHaveProperty('route', 'signIn');
      expect(state).toHaveProperty('QRFields', null);
    });

    it('subscribes to service state changes', () => {
      const store = createAuthenticatorStore();
      
      expect(mockService.subscribe).toHaveBeenCalled();
      
      // Simulate state change
      const subscribeCallback = mockService.subscribe.mock.calls[0][0];
      const newState = {
        value: 'authenticated',
        context: { user: { username: 'testuser' } },
      };
      
      mockGetServiceFacade.mockReturnValueOnce({
        ...mockGetServiceFacade(),
        authStatus: 'authenticated',
        user: { username: 'testuser' },
      });
      
      subscribeCallback(newState);
      
      const state = get(store);
      expect(state.authStatus).toBe('authenticated');
      expect(state.user).toEqual({ username: 'testuser' });
    });

    it('computes QR fields when totpSecretCode is present', () => {
      mockService.getSnapshot.mockReturnValue({
        value: 'setupTotp',
        context: {
          totpSecretCode: 'SECRET123',
          user: { username: 'testuser' },
        },
      });
      
      mockGetServiceFacade.mockReturnValue({
        ...mockGetServiceFacade(),
        totpSecretCode: 'SECRET123',
        user: { username: 'testuser' },
      });
      
      const store = createAuthenticatorStore();
      const state = get(store);
      
      expect(state.QRFields).toEqual({
        totpIssuer: expect.any(String),
        totpUsername: 'testuser',
      });
    });

    it('returns null QR fields when totpSecretCode is not present', () => {
      const store = createAuthenticatorStore();
      const state = get(store);
      
      expect(state.QRFields).toBeNull();
    });

    it('returns the same instance for multiple calls', () => {
      const store1 = createAuthenticatorStore();
      const store2 = createAuthenticatorStore();
      
      expect(store1).toBe(store2);
      expect(mockCreateAuthenticatorMachine).toHaveBeenCalledTimes(1);
    });
  });

  describe('useAuthenticator', () => {
    it('returns the singleton store', () => {
      const store = useAuthenticator();
      const state = get(store);
      
      expect(state).toHaveProperty('authStatus');
      expect(state).toHaveProperty('submitForm');
      expect(typeof state.submitForm).toBe('function');
    });

    it('returns the same store instance', () => {
      const store1 = useAuthenticator();
      const store2 = useAuthenticator();
      
      expect(store1).toBe(store2);
    });
  });

  describe('stopAuthenticatorService', () => {
    it('stops the service and clears references', () => {
      const store = createAuthenticatorStore();
      
      stopAuthenticatorService();
      
      expect(mockService.stop).toHaveBeenCalled();
      
      // Create new store after stopping
      mockService.start.mockClear();
      const newStore = createAuthenticatorStore();
      
      expect(mockService.start).toHaveBeenCalled();
      expect(newStore).not.toBe(store);
    });

    it('handles multiple calls gracefully', () => {
      createAuthenticatorStore();
      
      stopAuthenticatorService();
      stopAuthenticatorService();
      
      expect(mockService.stop).toHaveBeenCalledTimes(1);
    });
  });

  describe('Store subscription', () => {
    it('properly cleans up subscriptions', () => {
      const unsubscribeMock = vi.fn();
      mockService.subscribe.mockReturnValue(unsubscribeMock);
      
      const store = createAuthenticatorStore();
      const unsubscribe = store.subscribe(() => {});
      
      unsubscribe();
      
      // Should not call service unsubscribe for individual subscribers
      expect(unsubscribeMock).not.toHaveBeenCalled();
    });
  });
});