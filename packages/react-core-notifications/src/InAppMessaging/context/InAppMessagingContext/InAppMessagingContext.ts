import { createContext } from 'react';
import { Message } from '../../types';
import { initializeInAppMessaging } from 'aws-amplify/in-app-messaging';

// Set up required listeners for in-app messaging
initializeInAppMessaging();

export interface InAppMessagingContextType {
  clearMessage: () => void;
  displayMessage: (message: Message) => void;
  message: Message | null;
}

const InAppMessagingContext = createContext<InAppMessagingContextType | null>(
  null
);

export default InAppMessagingContext;
