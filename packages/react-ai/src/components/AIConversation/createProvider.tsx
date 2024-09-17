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
}: Pick<
  AIConversationInput,
  | 'elements'
  | 'actions'
  | 'suggestedPrompts'
  | 'responseComponents'
  | 'variant'
  | 'controls'
  | 'displayText'
>) {
  return function Provider({
    children,
    messages,
    avatars,
    handleSendMessage,
    isLoading,
    allowAttachments,
  }: {
    children?: React.ReactNode;
  } & Pick<
    AIConversationProps,
    | 'messages'
    | 'avatars'
    | 'handleSendMessage'
    | 'isLoading'
    | 'allowAttachments'
  >): React.JSX.Element {
    const _displayText = {
      ...defaultAIConversationDisplayTextEn,
      ...displayText,
    };
    return (
      <ElementsProvider elements={elements}>
        <ControlsProvider controls={controls}>
          <AttachmentProvider allowAttachments={allowAttachments}>
            <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
              <ResponseComponentsProvider
                responseComponents={responseComponents}
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
              </ResponseComponentsProvider>
            </SuggestedPromptProvider>
          </AttachmentProvider>
        </ControlsProvider>
      </ElementsProvider>
    );
  };
}
