import * as React from 'react';
import type { AIConversationInput } from '../types';

export interface AttachmentContextProps
  extends Pick<
    AIConversationInput,
    'allowAttachments' | 'maxAttachments' | 'maxAttachmentSize'
  > {}

export const AttachmentContext = React.createContext<
  Required<AttachmentContextProps>
>({
  allowAttachments: false,
  // We save attachments as base64 strings into dynamodb for conversation history
  // DynamoDB has a max size of 400kb for records
  // This can be overridden so cutsomers could provide a lower number
  // or a higher number if in the future we support larger sizes.
  maxAttachmentSize: 400_000,
  maxAttachments: 20,
});

export const AttachmentProvider = ({
  children,
  allowAttachments = false,
  maxAttachmentSize = 400_000,
  maxAttachments = 20,
}: React.PropsWithChildren<AttachmentContextProps>): React.JSX.Element => {
  const providerValue = React.useMemo(
    () => ({ maxAttachmentSize, maxAttachments, allowAttachments }),
    [maxAttachmentSize, maxAttachments, allowAttachments]
  );
  return (
    <AttachmentContext.Provider value={providerValue}>
      {children}
    </AttachmentContext.Provider>
  );
};
