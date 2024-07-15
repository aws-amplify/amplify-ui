import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from './context/elements';
import { SuggestedPromptProvider } from './context/SuggestedPromptsContext';
import { InputContextProvider } from './context/InputContext';

interface CreateAIConversationInput<T> {
  elements?: T;
}

const MOCK_PROMPTS = [
  {
    header: 'Help me find a rental',
    inputText: 'Find a rental with a pool',
  },
  {
    header: 'Help me find a rental',
    inputText: 'Find a rental with a basketball court',
  },
];

export default function createProvider<
  T extends Partial<AIConversationElements>,
>({ elements }: Pick<CreateAIConversationInput<T>, 'elements'>) {
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
      <ElementsProvider elements={elements}>
        <SuggestedPromptProvider suggestedPrompts={MOCK_PROMPTS}>
          <InputContextProvider>{children}</InputContextProvider>
        </SuggestedPromptProvider>
      </ElementsProvider>
    );
  };
}
