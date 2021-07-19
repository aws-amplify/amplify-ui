/**
 * TODO: This should be typed from core
 */
export type AuthState = 'signIn' | 'signUp' | 'signedIn';

/**
 * TODO: This should be replaced by the translation solution we end up with.
 */
export interface AttributeInfo {
  label: string;
  placeholder: string;
}

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => Record<string, AttributeInfo>;
