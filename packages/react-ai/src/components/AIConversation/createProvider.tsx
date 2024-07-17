import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from './context/elements';
import { ActionsProvider } from './context/ActionsContext';
import { AvatarsProvider } from './context/AvatarsContext';
import { MessagesProvider } from './context/MessagesContext';
import { actions, avatars, messages } from './mocks/mocks';

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
        <AvatarsProvider avatars={avatars}>
          <ActionsProvider actions={actions}>
            <MessagesProvider messages={messages}>{children}</MessagesProvider>
          </ActionsProvider>
        </AvatarsProvider>
      </ElementsProvider>
    );
  };
}
