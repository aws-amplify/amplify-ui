import React, { useContext } from 'react';
import type { AmplifyContext } from '@aws-amplify/ui';

/**
 * React context that provides the AmplifyContext instance
 * returned by `configure()` to all Amplify UI components.
 */
export const AmplifyContextContext = React.createContext<
  AmplifyContext | undefined
>(undefined);

/**
 * Hook to access the AmplifyContext from the nearest provider.
 */
export function useAmplifyContext(): AmplifyContext | undefined {
  return useContext(AmplifyContextContext);
}
