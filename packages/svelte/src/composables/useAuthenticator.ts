import { get } from 'svelte/store';
import { useAuthenticator as useAuthenticatorStore, type UseAuthenticator } from '../stores/authenticator';

/**
 * Composable function to access authenticator state and actions
 * This provides a more convenient API for components
 */
export function useAuthenticator(): UseAuthenticator {
  const store = useAuthenticatorStore();
  
  // Return the current value of the store
  // Note: This is not reactive by itself. Components should subscribe to the store
  // if they need reactive updates
  return get(store);
}

/**
 * Hook to get the authenticator store for reactive bindings
 * Use this when you need the store itself, not just the current value
 */
export function useAuthenticatorStore() {
  return useAuthenticatorStore();
}