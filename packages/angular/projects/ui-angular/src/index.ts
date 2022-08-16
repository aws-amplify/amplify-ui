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
 * Primitive Export
 */

export * from './lib/primitives-poc/button';
export * from './lib/primitives-poc/flex';
export * from './lib/primitives-poc/heading';
export * from './lib/primitives-poc/password-field';
export * from './lib/primitives-poc/text';
export * from './lib/primitives-poc/text-field';
export * from './lib/primitives-poc/view';

/**
 * Helpers
 */
export * from './lib/common';

/**
 * Directives
 */
export * from './lib/utilities/amplify-slot/amplify-slot.directive';

/**
 * Services
 */
export * from './lib/services/custom-components.service';
export * from './lib/services/authenticator.service';

/**
 * Re-export public APIs from `@aws-amplify/ui`
 */
export { translations } from '@aws-amplify/ui';
