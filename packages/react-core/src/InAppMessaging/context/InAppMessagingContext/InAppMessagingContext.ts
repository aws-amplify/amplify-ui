import { createContext } from 'react';
import { Message } from '../../types';

export interface InAppMessagingContextType {
  clearMessage: () => void;
  displayMessage: (message: Message) => void;
  message: Message | null;
}

const InAppMessagingContext = createContext<InAppMessagingContextType | null>(
  null
);

export default InAppMessagingContext;
