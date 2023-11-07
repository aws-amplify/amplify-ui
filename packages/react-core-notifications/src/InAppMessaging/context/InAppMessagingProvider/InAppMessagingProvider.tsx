import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { onMessageReceived } from 'aws-amplify/in-app-messaging';
import {
  InAppMessagingContext,
  InAppMessagingContextType,
} from '../InAppMessagingContext';

export interface InAppMessagingProviderProps {
  children: ReactNode;
}

export default function InAppMessagingProvider({
  children,
}: InAppMessagingProviderProps): JSX.Element {
  const [message, setMessage] =
    useState<InAppMessagingContextType['message']>(null);

  useEffect(() => {
    const listener = onMessageReceived(setMessage);
    return listener.remove;
  }, []);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      clearMessage,
      displayMessage: setMessage,
      message,
    }),
    [clearMessage, message]
  );

  return (
    <InAppMessagingContext.Provider value={value}>
      {children}
    </InAppMessagingContext.Provider>
  );
}
