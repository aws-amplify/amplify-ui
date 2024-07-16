import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';
import { MessagesProvider } from './context/MessagesContext';
import { AIConversationElements } from './context/elements';
import { messages } from './mocks/mocks';

interface CreateAIConversationInput<T> {
  elements?: T;
}

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
        <MessagesProvider messages={messages}>{children}</MessagesProvider>
      </ElementsProvider>
    );
  };
}
