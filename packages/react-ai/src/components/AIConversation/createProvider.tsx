import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from './context/elements';
import { SuggestedPromptProvider } from './context/SuggestedPromptsContext';
import { InputContextProvider } from './context/InputContext';
import { ActionsProvider } from './context/ActionsContext';
import { AvatarsProvider } from './context/AvatarsContext';
import { MessagesProvider } from './context/MessagesContext';
import { AIConversationInput, AIConversationProps } from './types';

export default function createProvider<
  T extends Partial<AIConversationElements>,
>({
  elements,
  actions,
  suggestedPrompts,
}: Pick<AIConversationInput<T>, 'elements' | 'actions' | 'suggestedPrompts'>) {
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
                <MessagesProvider messages={messages}>
                  {children}
                </MessagesProvider>
              </ActionsProvider>
            </AvatarsProvider>
          </InputContextProvider>
        </SuggestedPromptProvider>
      </ElementsProvider>
    );
  };
}
