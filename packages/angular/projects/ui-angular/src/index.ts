/*
 * Public API Surface of ui-angular
 */

/**
 * Modules
 */
export { AmplifyAuthenticatorModule } from './lib/components/authenticator/authenticator.module';

/**
 * Components
 */
export * from './lib/components/authenticator/components';
export * from './lib/primitives';

/**
 * Helpers
 */
export * from './lib/common';

/**
 * Directives
 */
export * from './lib/directives/amplify-slot.directive';

/**
 * Services
 */
export * from './lib/services/authenticator-context.service';
export * from './lib/services/state-machine.service';
