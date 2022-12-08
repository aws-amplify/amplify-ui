import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Notifications } from '@aws-amplify/notifications';
import {
  InAppMessagingContext,
  InAppMessagingContextType,
} from '../InAppMessagingContext';

export interface InAppMessagingProviderProps {
  children: ReactNode;
}

const { InAppMessaging } = Notifications;

export default function InAppMessagingProvider({
  children,
}: InAppMessagingProviderProps): JSX.Element {
  const [message, setMessage] =
    useState<InAppMessagingContextType['message']>(null);

  useEffect(() => {
    const listener = InAppMessaging.onMessageReceived((message) => {
      setMessage(message);
    });
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
