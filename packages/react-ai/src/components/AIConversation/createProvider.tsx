import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from './context/elements';
import { CreateAIConversationInput } from './types';

export default function createProvider<
  T extends Partial<AIConversationElements>,
>({ elements }: Pick<CreateAIConversationInput<T>, 'elements'>) {
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return <ElementsProvider elements={elements}>{children}</ElementsProvider>;
  };
}
