import React from 'react';
import { ActionState } from '@aws-amplify/ui-react-core';
import { V6Client } from '@aws-amplify/api-graphql';
import { useAIContext } from './AIContextProvider';
import { Content, ConversationMessage } from '../types';

interface SendMesageParameters {
  content: Content;
  aiContext?: Record<string, any>;
  responseComponents?: any;
}

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onResponse?: (message: ConversationMessage) => void; // handler for receiving new messages
}

interface AIConversationState {
  messages: ConversationMessage[];
}

export type UseAIConversationHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [ActionState<AIConversationState>, (input: SendMesageParameters) => void];

export function createUseAIConversation<T extends V6Client<any>>(
  _client: T
): UseAIConversationHook<Extract<keyof T['models'], string>> {
  const useAIConversation: UseAIConversationHook<
    Extract<keyof T['models'], string>
  > = (_routeName: keyof T['models']) => {
    // const conversation = client.ai.conversation as T['ai'])[routeName];

    // const session = conversation.startSession(sessionId);
    // const messageHistory = session.listMessages();
    // return useDataState(session.sendMessage, { messages: messageHistory });

    const { state, handler } = useAIContext();
    const { routeIdToMessages } = state;
    const messages = routeIdToMessages[_routeName as string];

    const sendMessage = (_input: SendMesageParameters) => {
      handler({
        routeIdToMessages: {
          ...routeIdToMessages,
          [_routeName]: [...(messages ?? []), 'content.value'],
        },
      });
    };

    const subscribe = React.useCallback((handleStoreChange: () => void) => {
      // Listen for messages on the WebSocket
      // session.onMessage // update message state
      // ws.onmessage = (_message: string) => {
      //   const messageData = { message: 'hello world' };
      //   setData(messageData);
      handleStoreChange();
      // };
      return () => {
        // Provide a way to unsubscribe to the event
        // ws.onmessage = null;
      };
    }, []);

    const getSnapshot = React.useCallback(() => messages, [messages]);

    // Using useSyncExternalStore to subscribe to external data updates
    const _store = React.useSyncExternalStore(subscribe, getSnapshot);

    const mockMessages = [
      {
        id: '1',
        content: {
          type: 'text' as const,
          value: 'I am your virtual assistant',
        },
        role: 'assistant' as const,
        timestamp: new Date(2023, 4, 21, 15, 23),
      },
      {
        id: '2',
        content: {
          type: 'text' as const,
          value:
            'I have a really long question. This is a long message This is a long message This is a long message This is a long message This is a long message',
        },
        role: 'user' as const,
        timestamp: new Date(2023, 4, 21, 15, 24),
      },
      {
        id: '3',
        content: {
          type: 'image' as const,
          value: {
            format: 'png' as const,
            bytes: new Uint8Array([]).buffer,
          },
        },
        role: 'assistant' as const,
        timestamp: new Date(2023, 4, 21, 15, 25),
      },
    ];

    return [
      {
        data: { messages: mockMessages },
        isLoading: false,
        message: undefined,
      },
      sendMessage,
    ];
  };

  return useAIConversation;
}
