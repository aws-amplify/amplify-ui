import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationInput, AIConversationProps } from './types';
import { defaultAIConversationDisplayTextEn } from './displayText';
import {
  ConversationDisplayTextProvider,
  SuggestedPromptProvider,
  ConversationInputContextProvider,
  AvatarsProvider,
  ActionsProvider,
  MessageVariantProvider,
  MessagesProvider,
  ControlsProvider,
  LoadingContextProvider,
  ResponseComponentsProvider,
  SendMessageContextProvider,
  MessageRendererProvider,
} from './context';
import { AttachmentProvider } from './context/AttachmentContext';

interface AIConversationProviderProps
  extends AIConversationInput,
    AIConversationProps {
  children?: React.ReactNode;
}

export const AIConversationProvider = ({
  elements,
  actions,
  suggestedPrompts,
  responseComponents,
  variant,
  controls,
  displayText,
  allowAttachments,
  messages,
  handleSendMessage,
  avatars,
  isLoading,
  children,
  messageRenderer,
}: AIConversationProviderProps): React.JSX.Element => {
  const _displayText = {
    ...defaultAIConversationDisplayTextEn,
    ...displayText,
  };
  return (
    <ElementsProvider elements={elements}>
      <ControlsProvider controls={controls}>
        <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
          <MessageRendererProvider {...messageRenderer}>
            <ResponseComponentsProvider responseComponents={responseComponents}>
              <AttachmentProvider allowAttachments={allowAttachments}>
                <ConversationDisplayTextProvider {..._displayText}>
                  <ConversationInputContextProvider>
                    <SendMessageContextProvider
                      handleSendMessage={handleSendMessage}
                    >
                      <AvatarsProvider avatars={avatars}>
                        <ActionsProvider actions={actions}>
                          <MessageVariantProvider variant={variant}>
                            <MessagesProvider messages={messages}>
                              <LoadingContextProvider isLoading={isLoading}>
                                {children}
                              </LoadingContextProvider>
                            </MessagesProvider>
                          </MessageVariantProvider>
                        </ActionsProvider>
                      </AvatarsProvider>
                    </SendMessageContextProvider>
                  </ConversationInputContextProvider>
                </ConversationDisplayTextProvider>
              </AttachmentProvider>
            </ResponseComponentsProvider>
          </MessageRendererProvider>
        </SuggestedPromptProvider>
      </ControlsProvider>
    </ElementsProvider>
  );
};
