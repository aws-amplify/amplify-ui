import * as React from 'react';
import { MessageColorTheme } from '../types';

export interface MessageContextProps {
  colorTheme?: MessageColorTheme;
  dismissed?: boolean;
  onDismiss?: () => void;
  setDismissed: (dismissed: boolean) => void;
}

export const MessageContext = React.createContext<MessageContextProps>({
  colorTheme: 'neutral',
  dismissed: false,
  setDismissed: () => {},
});

export const useMessageContext = (): MessageContextProps =>
  React.useContext(MessageContext);
