import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from './context/elements';
import { ActionsProvider } from './context/ActionsContext';
import { AvatarsProvider } from './context/AvatarsContext';
import { InputContextProvider } from './context/InputContext';
import { MessagesProvider } from './context/MessagesContext';
import { MessageVariantProvider } from './context/MessageVariantContext';
import { SuggestedPromptProvider } from './context/SuggestedPromptsContext';
import { AIConversationInput, AIConversationProps } from './types';

export default function createProvider<
  T extends Partial<AIConversationElements>,
>({
  elements,
  actions,
  suggestedPrompts,
  variant,
}: Pick<
  AIConversationInput<T>,
  'elements' | 'actions' | 'suggestedPrompts' | 'variant'
>) {
  return function Provider({
    children,
    messages,
    avatars,
  }: {
    children?: React.ReactNode;
  } & Pick<AIConversationProps, 'messages' | 'avatars'>): React.JSX.Element {
    return (
      <ElementsProvider elements={elements}>
        <SuggestedPromptProvider suggestedPrompts={suggestedPrompts}>
          <InputContextProvider>
            <AvatarsProvider avatars={avatars}>
              <ActionsProvider actions={actions}>
                <MessageVariantProvider variant={variant}>
                  <MessagesProvider messages={messages}>
                    {children}
                  </MessagesProvider>
                </MessageVariantProvider>
              </ActionsProvider>
            </AvatarsProvider>
          </InputContextProvider>
        </SuggestedPromptProvider>
      </ElementsProvider>
    );
  };
}
