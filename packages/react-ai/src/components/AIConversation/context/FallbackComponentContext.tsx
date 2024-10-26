import React from 'react';
import { AIConversationInput } from '../types';

export const FallbackComponentContext = React.createContext<
  AIConversationInput['fallbackResponseComponent'] | undefined
>(undefined);

export const FallbackComponentProvider = ({
  children,
  fallbackComponent,
}: {
  children?: React.ReactNode;
  fallbackComponent?: AIConversationInput['fallbackResponseComponent'];
}): JSX.Element => {
  return (
    <FallbackComponentContext.Provider value={fallbackComponent}>
      {children}
    </FallbackComponentContext.Provider>
  );
};
