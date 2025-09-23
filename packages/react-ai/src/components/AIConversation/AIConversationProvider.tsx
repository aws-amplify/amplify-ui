import React from 'react';

import type { AIConversationInput, AIConversationProps } from './types';
import { defaultAIConversationDisplayTextEn } from './displayText';
import {
  ActionsProvider,
  AIContextProvider,
  AttachmentProvider,
  AvatarsProvider,
  ControlsProvider,
  ConversationDisplayTextProvider,
  ConversationInputContextProvider,
  FallbackComponentProvider,
  LoadingContextProvider,
  MessageRendererProvider,
  MessagesProvider,
  MessageVariantProvider,
  ResponseComponentsProvider,
  SendMessageContextProvider,
  SuggestedPromptProvider,
  WelcomeMessageProvider,
} from './context';

export interface AIConversationProviderProps
  extends AIConversationInput,
    AIConversationProps {
  children?: React.ReactNode;
}

export const AIConversationProvider = ({
  aiContext,
  actions,
  allowAttachments,
  avatars,
  children,
  controls,
  displayText,
  handleSendMessage,
  isLoading,
  maxAttachmentSize,
  maxAttachments,
  messages,
  messageRenderer,
  responseComponents,
  suggestedPrompts,
  variant,
  welcomeMessage,
  FallbackResponseComponent,
}: AIConversationProviderProps): React.JSX.Element => {
  const _displayText = {
    ...defaultAIConversationDisplayTextEn,
    ...displayText,
  };
  return (
    <ControlsProvider controls={controls}>
      <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
        <WelcomeMessageProvider welcomeMessage={welcomeMessage}>
          <FallbackComponentProvider
            FallbackComponent={FallbackResponseComponent}
          >
            <MessageRendererProvider {...messageRenderer}>
              <ResponseComponentsProvider
                responseComponents={responseComponents}
              >
                <AttachmentProvider
                  allowAttachments={allowAttachments}
                  maxAttachmentSize={maxAttachmentSize}
                  maxAttachments={maxAttachments}
                >
                  <ConversationDisplayTextProvider {..._displayText}>
                    <ConversationInputContextProvider>
                      <SendMessageContextProvider
                        handleSendMessage={handleSendMessage}
                      >
                        <AvatarsProvider avatars={avatars}>
                          <ActionsProvider actions={actions}>
                            <MessageVariantProvider variant={variant}>
                              <MessagesProvider messages={messages}>
                                {/* aiContext should be as close as possible to the bottom */}
                                {/* because the intent is users should update the context */}
                                {/* without it affecting the already rendered messages */}
                                <AIContextProvider aiContext={aiContext}>
                                  <LoadingContextProvider isLoading={isLoading}>
                                    {children}
                                  </LoadingContextProvider>
                                </AIContextProvider>
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
          </FallbackComponentProvider>
        </WelcomeMessageProvider>
      </SuggestedPromptProvider>
    </ControlsProvider>
  );
};
