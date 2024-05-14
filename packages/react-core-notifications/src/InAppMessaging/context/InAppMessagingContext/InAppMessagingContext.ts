import { createContext } from 'react';
import { InAppMessage } from '../../types';

export interface InAppMessagingContextType {
  clearMessage: () => void;
  displayMessage: (message: InAppMessage) => void;
  message: InAppMessage | null;
}

const InAppMessagingContext = createContext<InAppMessagingContextType | null>(
  null
);

export default InAppMessagingContext;
