import React from 'react';
import { MessageVariant } from '../types';

type MessageVariantContextProps = MessageVariant | undefined;

export const MessageVariantContext =
  React.createContext<MessageVariantContextProps>(undefined);

export const MessageVariantProvider = ({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant?: MessageVariantContextProps;
}): JSX.Element => {
  return (
    <MessageVariantContext.Provider value={variant}>
      {children}
    </MessageVariantContext.Provider>
  );
};
