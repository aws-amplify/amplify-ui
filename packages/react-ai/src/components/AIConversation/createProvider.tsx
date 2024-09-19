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
} from './context';
import { AttachmentProvider } from './context/AttachmentContext';

export default function createProvider({
  elements,
  actions,
  suggestedPrompts,
  responseComponents,
  variant,
  controls,
  displayText,
  allowAttachments,
}: Pick<
  AIConversationInput,
  | 'elements'
  | 'actions'
  | 'suggestedPrompts'
  | 'responseComponents'
  | 'variant'
  | 'controls'
  | 'displayText'
  | 'allowAttachments'
>) {
  return function Provider({
    children,
    messages,
    avatars,
    handleSendMessage,
    isLoading,
  }: {
    children?: React.ReactNode;
  } & Pick<
    AIConversationProps,
    'messages' | 'avatars' | 'handleSendMessage' | 'isLoading'
  >): React.JSX.Element {
    const _displayText = {
      ...defaultAIConversationDisplayTextEn,
      ...displayText,
    };
    return (
      <ElementsProvider elements={elements}>
        <ControlsProvider controls={controls}>
          <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
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
          </SuggestedPromptProvider>
        </ControlsProvider>
      </ElementsProvider>
    );
  };
}
