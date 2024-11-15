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
  WelcomeMessageProvider,
  FallbackComponentProvider,
  MessageRendererProvider,
  AIContextProvider,
} from './context';
import { AttachmentProvider } from './context/AttachmentContext';

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
  elements,
  handleSendMessage,
  isLoading,
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
    <ElementsProvider elements={elements}>
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
                                  {/* aiContext should be as close as possible to the bottom */}
                                  {/* because the intent is users should update the context */}
                                  {/* without it affecting the already rendered messages */}
                                  <AIContextProvider aiContext={aiContext}>
                                    <LoadingContextProvider
                                      isLoading={isLoading}
                                    >
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
    </ElementsProvider>
  );
};
