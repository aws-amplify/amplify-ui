import * as React from 'react';
import type { MessageColorTheme } from '../types';

export interface MessageContextType {
  colorTheme?: MessageColorTheme;
  dismissed?: boolean;
  setDismissed: (dismissed: boolean) => void;
}

export const MessageContext = React.createContext<MessageContextType>({
  dismissed: false,
  setDismissed: () => {},
});

export const useMessage = (): MessageContextType =>
  React.useContext(MessageContext);
