import { useEffect, useMemo, useState } from 'react';
import { onMessageReceived } from 'aws-amplify/in-app-messaging';
import type { InAppMessagingContextType } from '../InAppMessagingContext';

export function useInAppMessagingState(): InAppMessagingContextType {
  const [message, setMessage] =
    useState<InAppMessagingContextType['message']>(null);

  useEffect(() => {
    const listener = onMessageReceived(setMessage);
    return listener.remove;
  }, []);

  return useMemo(
    () => ({
      clearMessage: () => {
        setMessage(null);
      },
      displayMessage: setMessage,
      message,
    }),
    [message]
  );
}
