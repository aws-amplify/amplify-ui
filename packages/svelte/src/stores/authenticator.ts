import { writable, derived, type Readable } from 'svelte/store';
import { interpret } from 'xstate';
import {
  createAuthenticatorMachine,
  getServiceFacade,
  type AuthInterpreter,
  type AuthMachineState,
  type AuthEventData,
  type AuthenticatorServiceFacade,
} from '@aws-amplify/ui';

// Extend the facade interface for Svelte
export interface UseAuthenticator extends AuthenticatorServiceFacade {
  QRFields: { totpIssuer?: string; totpUsername?: string } | null;
}

// Store for the XState service
let authenticatorService: AuthInterpreter | null = null;

/**
 * Creates and starts the authenticator service
 */
function createAuthenticatorService(): AuthInterpreter {
  if (authenticatorService) {
    return authenticatorService;
  }

  const machine = createAuthenticatorMachine();
  authenticatorService = interpret(machine).start();
  
  return authenticatorService;
}

/**
 * Creates the authenticator store
 */
export function createAuthenticatorStore(): Readable<UseAuthenticator> {
  const service = createAuthenticatorService();
  
  // Create a writable store for the state
  const state = writable<AuthMachineState>(service.getSnapshot());
  
  // Subscribe to state changes
  const unsubscribe = service.subscribe((newState) => {
    state.set(newState);
  });
  
  // Create a derived store that computes the facade
  const authenticator = derived<typeof state, UseAuthenticator>(
    state,
    ($state) => {
      const facade = getServiceFacade({ send: service.send, state: $state });
      
      // Compute QR fields
      const QRFields = (() => {
        if (!$state.context?.totpSecretCode) return null;
        
        const { user } = $state.context;
        const totpIssuer = user?.username ? window.location.hostname : undefined;
        const totpUsername = user?.username;
        
        return totpIssuer || totpUsername ? { totpIssuer, totpUsername } : null;
      })();
      
      return {
        ...facade,
        QRFields,
      };
    }
  );
  
  // Override the subscribe method to handle cleanup
  const originalSubscribe = authenticator.subscribe;
  authenticator.subscribe = (run, invalidate?) => {
    const unsubscriber = originalSubscribe(run, invalidate);
    
    return () => {
      unsubscriber();
      // Note: We don't stop the service here as it might be used by multiple components
      // The service cleanup should be handled at the app level if needed
    };
  };
  
  return authenticator;
}

// Singleton store instance
let authenticatorStore: Readable<UseAuthenticator> | null = null;

/**
 * Returns the singleton authenticator store
 * This ensures all components share the same XState service
 */
export function useAuthenticator(): Readable<UseAuthenticator> {
  if (!authenticatorStore) {
    authenticatorStore = createAuthenticatorStore();
  }
  
  return authenticatorStore;
}

/**
 * Stops the authenticator service (for cleanup)
 */
export function stopAuthenticatorService(): void {
  if (authenticatorService) {
    authenticatorService.stop();
    authenticatorService = null;
    authenticatorStore = null;
  }
}