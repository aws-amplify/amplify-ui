import React from 'react';
import { V6Client } from '@aws-amplify/api-graphql';
import { Conversation, ConversationMessage } from '@aws-amplify/data-schema/dist/esm/ai/ConversationType';
import { DataState } from '@aws-amplify/ui-react-core';
import { useAIContext } from './AIContextProvider';

interface SendMesageParameters {
  content: Parameters<Conversation['sendMessage']>[0]['content'];
  aiContext?: Parameters<Conversation['sendMessage']>[0]['aiContext'];
  responseComponents?: any;
}

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onResponse?: (message: ConversationMessage) => void;
}

interface AIConversationState {
  messages: ConversationMessage[];
}

export type UseAIConversationHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [DataState<AIConversationState>, (input: SendMesageParameters) => void];

export function createUseAIConversation<T extends V6Client<any>>(
  client: T
): UseAIConversationHook<Extract<keyof T['conversations'], string>> {
  const useAIConversation: UseAIConversationHook<
    Extract<keyof T['conversations'], string>
  > = (routeName: keyof T['conversations'], input = {}) => {
    const clientRoute = (client.conversations as T['conversations'])[routeName];

    const { routeToConversationsMap, setRouteToConversationsMap } = useAIContext();
    const messagesFromAIContext = input.id ? routeToConversationsMap[routeName as string]?.[input.id] : undefined;
    const [localMessages, setLocalMessages] = React.useState<ConversationMessage[]>(messagesFromAIContext ?? []);
    const [localConversation, setLocalConversation] = React.useState<Conversation | undefined>(undefined);

    // On hook initialization get conversation and load all messages
    React.useEffect(() => {
      async function initialize() {
        const { data: conversation } = input.id ? await clientRoute.get({ id: input.id }) : await clientRoute.create();

        if (!conversation) {
          throw new Error('no conversation found');
        }

        const { data: messages } = await conversation.listMessages();

        setLocalMessages(messages);
        setLocalConversation(conversation)
        console.log({ conversation })
        setRouteToConversationsMap({
          ...routeToConversationsMap, [routeName]: {
            ...routeToConversationsMap[routeName as string], [conversation.id]: messages
          }
        })
      }

      initialize();
    }, [clientRoute, input.id, routeName, setRouteToConversationsMap])

    // Update messages to match what is in AIContext if they aren't equal
    React.useEffect(() => {
      if (!!messagesFromAIContext && messagesFromAIContext !== localMessages)
        setLocalMessages(messagesFromAIContext)
    }, [messagesFromAIContext, localMessages])

    const sendMessage = (input: SendMesageParameters) => {
      const { content, aiContext } = input;
      localConversation?.sendMessage({ content, aiContext })
        .then((value) => {
          const { data: sentMessage } = value;
          console.log('we just sent this message', sentMessage)

          if (sentMessage) {
            setLocalMessages([...localMessages, sentMessage]);
            setRouteToConversationsMap({
              ...routeToConversationsMap, [routeName]: {
                ...routeToConversationsMap[routeName as string], [localConversation.id]: [...localMessages, sentMessage]
              }
            })
          }
        })
        .catch((reason) => {
          throw new Error(`error sending message ${reason}`)
        });
    };

    const subscribe = React.useCallback((handleStoreChange: () => void) => {
      const subscription = localConversation && localConversation.onMessage((message) => {
        console.log({ message })
        setLocalMessages([...localMessages, message]);
        setRouteToConversationsMap({
          ...routeToConversationsMap, [routeName]: {
            ...routeToConversationsMap[routeName as string], [localConversation.id]: [...localMessages, message]
          }
        })
        handleStoreChange(); // should cause a re-render
      })
      return () => {
        subscription?.unsubscribe();
      };
    }, [localConversation, localMessages, routeName, routeToConversationsMap, setRouteToConversationsMap]);

    const getSnapshot = React.useCallback(() => localMessages, [localMessages]);

    // Using useSyncExternalStore to subscribe to external data updates
    // Have to provide third optional argument in next - https://github.com/vercel/next.js/issues/54685
    const messagesFromStore = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    return [
      {
        data: { messages: messagesFromStore },
        isLoading: false,
        message: undefined,
        hasError: false,
      },
      sendMessage,
    ];
  };

  return useAIConversation;
}
