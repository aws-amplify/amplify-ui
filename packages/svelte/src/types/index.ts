/**
 * Re-export types from @aws-amplify/ui for convenience
 */
export type {
  AuthStatus,
  AuthUser,
  AuthenticatorRoute,
  ChallengeName,
  SocialProvider,
  AuthMFAType,
  UnverifiedUserAttributes,
  AuthenticatorValidationErrors,
  V5CodeDeliveryDetails,
  AuthEventData,
} from '@aws-amplify/ui';

/**
 * Svelte-specific component props
 */
export interface AuthenticatorProps {
  /**
   * Initial route to display
   */
  initialRoute?: AuthenticatorRoute;
  
  /**
   * Social providers to display
   */
  socialProviders?: SocialProvider[];
  
  /**
   * Custom theme
   */
  theme?: Record<string, any>;
  
  /**
   * Whether to hide the sign up link
   */
  hideSignUp?: boolean;
  
  /**
   * Custom form fields configuration
   */
  formFields?: Record<string, any>;
}

/**
 * Slot props passed to child components
 */
export interface AuthenticatorSlotProps {
  /**
   * Current authentication status
   */
  authStatus: AuthStatus;
  
  /**
   * Authenticated user
   */
  user: AuthUser | undefined;
  
  /**
   * Sign out function
   */
  signOut: () => void;
}

/**
 * Common props for authentication form components
 */
export interface AuthFormProps {
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the form is submitting
   */
  isPending?: boolean;
  
  /**
   * Validation errors
   */
  validationErrors?: Record<string, string>;
}