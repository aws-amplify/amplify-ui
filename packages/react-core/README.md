# Amplify UI React Core

`@aws-amplify/ui-react-core` is a React platform agnostic utility library for Amplify UI internal usage in `@aws-amplify/ui-react*` and `@aws-amplify/ui-react-native*` namespaced packages.

## Contents

### Authenticator

- `AuthenticatorProvider` - Provider component for Authenticator context
- `useAuthenticator` - Hook for accessing Authenticator functionality
- `useAuthenticatorRoute` - Hook for accessing Authenticator route information
- `useAuthenticatorInitMachine` - Hook for initializing Authenticator state machine
- `isAuthenticatorComponentRouteKey` - Utility function for checking route keys
- `resolveAuthenticatorComponents` - Utility function for resolving Authenticator components

### Form Components and Hooks

- `FormProvider` - Provider component for form context
- `useField` - Hook for accessing form field functionality
- `useForm` - Hook for accessing form functionality
- `withFormProvider` - Higher-order component for adding form provider capabilities
- `RenderNothing` - Utility component for rendering nothing

### Utility Hooks

- `useAsyncReducer` - Hook for async state management
- `useControlledReducer` - Hook for controlled state management
- `useDeprecationWarning` - Hook for displaying deprecation warnings
- `useDropZone` - Hook for drag and drop functionality
- `useGetUrl` - Hook for getting URLs
- `useHasValueUpdated` - Hook for checking if a value has updated
- `usePreviousValue` - Hook for accessing previous value
- `useSetUserAgent` - Hook for setting user agent
- `useTimeout` - Hook for timeout functionality

### Utility Functions

- `createContextUtilities` - Utility function for creating context utilities

### Type Definitions

- Various type definitions for Authenticator, Form, and utility components
