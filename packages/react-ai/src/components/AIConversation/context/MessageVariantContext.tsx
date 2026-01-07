import React from 'react';
import type { MessageVariant } from '../types';

export const MessageVariantContext = React.createContext<
  MessageVariant | undefined
>(undefined);

export const MessageVariantProvider = ({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant?: MessageVariant;
}): React.JSX.Element => {
  return (
    <MessageVariantContext.Provider value={variant}>
      {children}
    </MessageVariantContext.Provider>
  );
};
