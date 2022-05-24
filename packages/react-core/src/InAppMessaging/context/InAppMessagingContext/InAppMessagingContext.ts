import { createContext } from 'react';
import { InAppMessage } from '@aws-amplify/notifications';

export interface InAppMessagingContextType {
  clearInAppMessage: () => void;
  displayInAppMessage: (inAppMessage: InAppMessage) => void;
  inAppMessage: InAppMessage | null;
}

const InAppMessagingContext = createContext<InAppMessagingContextType | null>(
  null
);

export default InAppMessagingContext;
