import * as React from 'react';
import { MessageColorThemes } from '../types';

export interface MessageContextProps {
  colorTheme?: MessageColorThemes;
  dismissed?: boolean;
  setDismissed: (dismissed: boolean) => void;
}

export const MessageContext = React.createContext<MessageContextProps>({
  colorTheme: 'neutral',
  dismissed: false,
  setDismissed: () => {},
});

export const useMessageContext = (): MessageContextProps =>
  React.useContext(MessageContext);
