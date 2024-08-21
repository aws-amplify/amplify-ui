import React from 'react';
import { DataState } from '@aws-amplify/ui-react-core';
import { RouteToConversations, useAIContext } from './AIContextProvider';
import {
  Conversation,
  ConversationMessage,
  ConversationRoute,
  SendMesageParameters,
  SendMessage,
} from '../types';

function createNewConversationMessageInRoute({
  previousValue,
  routeName,
  conversationId,
  messages,
}: {
  previousValue: RouteToConversations;
  routeName: string;
  conversationId: string;
  messages: ConversationMessage[];
}) {
  return {
    ...previousValue,
    [routeName]: {
      ...previousValue[routeName],
      [conversationId]: messages,
    },
  };
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
) => [DataState<AIConversationState>, SendMessage];

export function createUseAIConversation<
  T extends Record<'conversations', Record<string, ConversationRoute>>,
>(client: T): UseAIConversationHook<Extract<keyof T['conversations'], string>> {
  const useAIConversation: UseAIConversationHook<
    Extract<keyof T['conversations'], string>
  > = (routeName: keyof T['conversations'], input = {}) => {
    const clientRoute = (client.conversations as T['conversations'])[routeName];

    const { routeToConversationsMap, setRouteToConversationsMap } =
      useAIContext();
    const messagesFromAIContext = input.id
      ? routeToConversationsMap[routeName as string]?.[input.id]
      : undefined;
    const [localMessages, setLocalMessages] = React.useState<
      ConversationMessage[]
    >(messagesFromAIContext ?? []);
    const [conversation, setConversation] = React.useState<
      Conversation | undefined
    >(undefined);
    const [waitingForAIResponse, setWaitingForAIResponse] =
      React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<
      string | undefined
    >();
    const [hasError, setHasError] = React.useState<boolean>(false);

    // On hook initialization get conversation and load all messages
    React.useEffect(() => {
      async function initialize() {
        const { data: conversation } = input.id
          ? await clientRoute.get({ id: input.id })
          : await clientRoute.create();

        if (!conversation) {
          const errorString = 'No conversation found';
          setHasError(true);
          setErrorMessage(errorString);
          throw new Error(errorString);
        }

        const { data: messages } = await conversation.listMessages();

        setLocalMessages(messages);
        setConversation(conversation);
        setRouteToConversationsMap((previousValue) => {
          return createNewConversationMessageInRoute({
            previousValue,
            routeName: routeName as string,
            conversationId: conversation.id,
            messages,
          });
        });
      }

      initialize();
    }, [clientRoute, input.id, routeName, setRouteToConversationsMap]);

    // Update messages to match what is in AIContext if they aren't equal
    React.useEffect(() => {
      if (!!messagesFromAIContext && messagesFromAIContext !== localMessages)
        setLocalMessages(messagesFromAIContext);
    }, [messagesFromAIContext, localMessages]);

    const sendMessage = React.useCallback(
      (input: SendMesageParameters) => {
        const { content, aiContext, toolConfiguration } = input;
        conversation
          ?.sendMessage({ content, aiContext, toolConfiguration })
          .then((value) => {
            const { data: sentMessage } = value;

            if (sentMessage) {
              setWaitingForAIResponse(true);
              setLocalMessages((previousLocalMessages) => [
                ...previousLocalMessages,
                sentMessage,
              ]);
              setRouteToConversationsMap((previousValue) => {
                return createNewConversationMessageInRoute({
                  previousValue,
                  routeName: routeName as string,
                  conversationId: conversation.id,
                  messages: [
                    ...previousValue[routeName as string][conversation.id],
                    sentMessage,
                  ],
                });
              });
            }
          })
          .catch((reason) => {
            setHasError(true);
            setErrorMessage(`error sending message ${reason}`);
          });
      },
      [conversation, routeName, setRouteToConversationsMap]
    );

    const subscribe = React.useCallback(
      (handleStoreChange: () => void) => {
        const subscription =
          conversation &&
          conversation.onMessage((message) => {
            if (input.onResponse) input.onResponse(message);
            setWaitingForAIResponse(false);
            setLocalMessages((previousLocalMessages) => [
              ...previousLocalMessages,
              message,
            ]);
            setRouteToConversationsMap((previousValue) => {
              return createNewConversationMessageInRoute({
                previousValue,
                routeName: routeName as string,
                conversationId: conversation.id,
                messages: [
                  ...previousValue[routeName as string][conversation.id],
                  message,
                ],
              });
            });
            handleStoreChange(); // should cause a re-render
          });
        return () => {
          subscription?.unsubscribe();
        };
      },
      [conversation, routeName, setRouteToConversationsMap, input]
    );

    const getSnapshot = React.useCallback(() => localMessages, [localMessages]);

    // Using useSyncExternalStore to subscribe to external data updates
    // Have to provide third optional argument in next - https://github.com/vercel/next.js/issues/54685
    const messagesFromStore = React.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getSnapshot
    );

    return [
      {
        data: { messages: messagesFromStore },
        isLoading: waitingForAIResponse,
        message: errorMessage,
        hasError,
      },
      sendMessage,
    ];
  };

  return useAIConversation;
}
