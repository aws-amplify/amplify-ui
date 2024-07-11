import { V6Client } from '@aws-amplify/api-graphql';
import { useDataState, ActionState } from '@aws-amplify/ui-react-core';
import React from 'react';
import { useAIContext } from './AIContextProvider';

interface ImageContent {
  format: 'png' | 'jpeg' | 'gif' | 'webp';
  bytes: ArrayBuffer;
}

interface Content {
  type: 'text' | 'image';
  value: string | ImageContent;
}

interface Message {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SendMesageParameters {
  message: Message;
  aiContext?: Record<string, any>; // additional context the developer may want to provide
}

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onError?: (error: Error) => void;
  onMessage?: (message: string) => void; // handler for receiving new messages
}

interface AIConversationState {
  messages: Message[];
}

type UseAIConversationHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [ActionState<AIConversationState>, (input: SendMesageParameters) => void];

interface GenerateParameters {
  arguments: string | string[] | number;
}

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

interface AIGenerationState {
  result?: string;
}

type UseAIGenerationHook<T extends string> = (
  routeName: T,
  input?: UseAIGenerationInput
) => [ActionState<AIGenerationState>, (input: GenerateParameters) => void];

export function createAIHooks<T extends V6Client<any>>(
  _client: T
): {
  useAIConversation: UseAIConversationHook<Extract<keyof T['models'], string>>;
  useAIGeneration: UseAIGenerationHook<Extract<keyof T['models'], string>>;
} {
  const useAIConversation = (
    _routeName: keyof T['models']
  ): [string[], (message: string) => void] => {
    // const conversation = client.ai.conversation as T['ai'])[routeName];

    // const session = conversation.startSession(sessionId);
    // const messageHistory = session.listMessages();
    // return useDataState(session.sendMessage, { messages: messageHistory });

    const { state, handler } = useAIContext();
    const { routeIdToMessages } = state;
    const messages = routeIdToMessages[_routeName as string];

    const sendMessage = (message: string) => {
      handler({
        routeIdToMessages: {
          ...routeIdToMessages,
          [_routeName]: [...(messages ?? []), message],
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
    const store = React.useSyncExternalStore(subscribe, getSnapshot);

    return [store, sendMessage];
  };

  const useAIGeneration = (
    _routeName: keyof T['models'],
    _input?: UseAIGenerationInput
  ) => {
    // return useDataState(client.ai.generation as T['ai'])[routeName].generate, { messages: [] });
    // const generate = client.ai.generate as T['ai'])[routeName];

    // const newAction = async (_prev: { result: string }, _input: GenerateParameters) => {
    //   const result = await generate(_input);
    //   return { result }
    // }

    const updateAIGenerationStateAction = async (
      _prev: AIGenerationState,
      _input: GenerateParameters
    ): Promise<AIGenerationState> => {
      await new Promise((r) => setTimeout(r, 2000));
      return { result: 'generatedresult' };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return { useAIConversation, useAIGeneration };
}
