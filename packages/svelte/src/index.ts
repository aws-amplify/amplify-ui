/**
 * @aws-amplify/ui-svelte
 */

// Export version
export const VERSION = '0.0.1';

// Export stores and composables
export { useAuthenticator, useAuthenticatorStore } from './composables/useAuthenticator';
export { createAuthenticatorStore, stopAuthenticatorService, type UseAuthenticator } from './stores/authenticator';

// Export primitive components
export { Button, TextField, PasswordField } from './components/primitives';

// Export Authenticator components
export { Authenticator } from './components/Authenticator';

// Export types
export * from './types';