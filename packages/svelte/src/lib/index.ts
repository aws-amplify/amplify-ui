// Reexport your entry components here
import './styles.css';

export * from './components/Authenticator';
export * from './components/controls';
export * from './components/primitives';
export * from './types';

export { useAuthenticator } from './stores/authenticator.svelte';
export { translations } from '@aws-amplify/ui';
