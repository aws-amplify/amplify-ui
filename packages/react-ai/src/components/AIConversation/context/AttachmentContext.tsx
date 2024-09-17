import * as React from 'react';

export const AttachmentContext = React.createContext(false);

export const AttachmentProvider = ({
  children,
  allowAttachments,
}: {
  children?: React.ReactNode;
  allowAttachments?: boolean;
}): JSX.Element => {
  return (
    <AttachmentContext.Provider value={allowAttachments ?? false}>
      {children}
    </AttachmentContext.Provider>
  );
};
