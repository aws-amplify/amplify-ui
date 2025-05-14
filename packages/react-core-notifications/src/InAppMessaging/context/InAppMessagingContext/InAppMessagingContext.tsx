import React from 'react';
import type { InAppMessage } from '../../types';
import { useInAppMessagingState } from './useInAppMessagingState';

export interface InAppMessagingContextType {
  clearMessage: () => void;
  displayMessage: (message: InAppMessage) => void;
  message: InAppMessage | null;
}

const InAppMessagingContext =
  React.createContext<InAppMessagingContextType | null>(null);

export default InAppMessagingContext;

export interface InAppMessagingProviderProps {
  children: React.ReactNode;
}

export interface UseInAppMessaging extends InAppMessagingContextType {}

export const ERROR_MESSAGE =
  '`useInAppMessaging` must be called from within `InAppMessagingProvider`';

/**
 * Utility hook used to access the InAppMessagingContext values
 *
 * @returns {InAppMessagingContextType} InAppMessaging context values
 */
export function useInAppMessaging(): UseInAppMessaging {
  const context = React.useContext(InAppMessagingContext);

  if (!context) {
    throw new Error(ERROR_MESSAGE);
  }
  return context;
}

export function InAppMessagingProvider({
  children,
}: InAppMessagingProviderProps): React.JSX.Element {
  const value = useInAppMessagingState();

  return (
    <InAppMessagingContext.Provider value={value}>
      {children}
    </InAppMessagingContext.Provider>
  );
}
