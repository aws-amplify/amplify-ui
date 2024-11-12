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
} from './context';
import { AttachmentProvider } from './context/AttachmentContext';

export interface AIConversationProviderProps
  extends AIConversationInput,
    AIConversationProps {
  children?: React.ReactNode;
}

export const AIConversationProvider = ({
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
  responseComponents,
  suggestedPrompts,
  variant,
  welcomeMessage,
  FallbackResponseComponent,
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
            </FallbackComponentProvider>
          </WelcomeMessageProvider>
        </SuggestedPromptProvider>
      </ControlsProvider>
    </ElementsProvider>
  );
};
