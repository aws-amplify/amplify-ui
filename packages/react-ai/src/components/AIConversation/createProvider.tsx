import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionsProvider } from './context/ActionsContext';
import { AvatarsProvider } from './context/AvatarsContext';
import { ConversationInputContextProvider } from './context/ConversationInputContext';
import { MessagesProvider } from './context/MessagesContext';
import { MessageVariantProvider } from './context/MessageVariantContext';
import { SuggestedPromptProvider } from './context/SuggestedPromptsContext';
import { AIConversationInput, AIConversationProps } from './types';
import { ResponseComponentsProvider } from './context/ResponseComponentsContext';
import { SendMessageContextProvider } from './context/SendMessageContext';
import { ControlsProvider } from './context/ControlsContext';
import { LoadingContextProvider } from './context/LoadingContext';

export default function createProvider({
  elements,
  actions,
  suggestedPrompts,
  responseComponents,
  variant,
  controls,
}: Pick<
  AIConversationInput,
  | 'elements'
  | 'actions'
  | 'suggestedPrompts'
  | 'responseComponents'
  | 'variant'
  | 'controls'
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
    return (
      <ElementsProvider elements={elements}>
        <ControlsProvider controls={controls}>
          <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
            <ResponseComponentsProvider responseComponents={responseComponents}>
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
            </ResponseComponentsProvider>
          </SuggestedPromptProvider>
        </ControlsProvider>
      </ElementsProvider>
    );
  };
}
