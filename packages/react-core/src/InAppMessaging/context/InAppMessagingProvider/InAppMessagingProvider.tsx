import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { InAppMessage, Notifications } from '@aws-amplify/notifications';
import { InAppMessagingContext } from '../InAppMessagingContext';

export interface InAppMessagingProviderProps {
  children: ReactNode;
}

const { InAppMessaging } = Notifications;

export default function InAppMessagingProvider({
  children,
}: InAppMessagingProviderProps): JSX.Element {
  const [inAppMessage, setInAppMessage] = useState<InAppMessage | null>(null);

  useEffect(() => {
    const listener = InAppMessaging.onMessageReceived((message) => {
      setInAppMessage(message);
    });
    return listener.remove;
  }, []);

  const clearInAppMessage = useCallback(() => {
    setInAppMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      clearInAppMessage,
      displayInAppMessage: setInAppMessage,
      inAppMessage,
    }),
    [clearInAppMessage, inAppMessage]
  );

  return (
    <InAppMessagingContext.Provider value={value}>
      {children}
    </InAppMessagingContext.Provider>
  );
}
