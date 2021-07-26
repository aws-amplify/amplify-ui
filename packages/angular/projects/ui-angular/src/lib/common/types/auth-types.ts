import { AuthInputAttributes } from '@aws-amplify/ui-core';

/**
 * TODO: This should be typed from core
 */
export type AuthState = 'signIn' | 'signUp' | 'signedIn';

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => AuthInputAttributes;
