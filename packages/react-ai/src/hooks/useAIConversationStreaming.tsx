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
import { ResponseComponents } from '../components/AIConversation/types';
import {
  convertResponseComponentsToToolConfiguration,
  prependResponseComponents,
} from '../components/AIConversation/context/ResponseComponentsContext';

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

interface GraphQLFormattedError {
  readonly message: string;
  readonly errorType: string;
  readonly errorInfo: null | {
    [key: string]: unknown;
  };
}

type SingularReturnValue<T> = {
  data: T | null;
  errors?: GraphQLFormattedError[];
};

type ConversationState<T> = Omit<DataState<T>, 'message'> & {
  messages?: GraphQLFormattedError[];
};

// default state
const INITIAL_STATE = {
  hasError: false,
  isLoading: false,
  messages: undefined,
};
const LOADING_STATE = { hasError: false, isLoading: true, messages: undefined };
const ERROR_STATE = { hasError: true, isLoading: false };

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onResponse?: (message: ConversationMessage) => void;
  responseComponents?: ResponseComponents;
}

interface AIConversationState {
  messages: ConversationMessage[];
}

export type UseAIConversationStreamingHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [ConversationState<AIConversationState>, SendMessage];

export function createUseAIConversationStreaming<
  T extends Record<'conversations', Record<string, ConversationRoute>>,
>(
  client: T
): UseAIConversationStreamingHook<Extract<keyof T['conversations'], string>> {
  const useAIConversation: UseAIConversationStreamingHook<
    Extract<keyof T['conversations'], string>
  > = (routeName: keyof T['conversations'], input = {}) => {
    const clientRoute = (client.conversations as T['conversations'])[routeName];

    const { routeToConversationsMap, setRouteToConversationsMap } =
      useAIContext();

    const messagesFromAIContext = input.id
      ? routeToConversationsMap[routeName as string]?.[input.id]
      : undefined;

    const [dataState, setDataState] = React.useState<
      ConversationState<AIConversationState>
    >(() => ({
      ...INITIAL_STATE,
      data: { messages: [] },
    }));

    const messageChunksRef = React.useRef<ConversationMessage[]>();
    const conversationRef = React.useRef<Conversation>();

    const toolConfiguration = input.responseComponents
      ? convertResponseComponentsToToolConfiguration(
          prependResponseComponents(input.responseComponents)
        )
      : undefined;

    // On hook initialization get conversation and load all messages
    React.useEffect(() => {
      let subscription: ReturnType<Conversation['onMessage']>;

      async function initialize() {
        if (!conversationRef.current) {
          const { data: conversation, errors } = input.id
            ? await clientRoute.get({ id: input.id })
            : await clientRoute.create();

          if (errors && errors.length) {
            setDataState((prevState) => ({
              ...prevState,
              ...ERROR_STATE,
              messages: errors,
            }));
            return;
          }
          if (conversation) {
            conversationRef.current = conversation;
            if (input.id) {
              const messages = await conversation.listMessages();
              setDataState((prevState) => ({
                ...prevState,
                data: { messages: messages.data },
              }));
            }
          }
        }

        if (conversationRef.current) {
          subscription = conversationRef.current.onMessage((message) => {
            console.log(message);
            // see if the message is a chunk or full message
            const isChunk = message.id.endsWith('#response');

            if (isChunk) {
              const isEmptyChunk = !message.content[0];
              const toolChunk = message.content.find((c) => c.toolUse);
              // if there is no current ref its the first chunk
              if (!messageChunksRef.current) {
                if (!isEmptyChunk) {
                  messageChunksRef.current = [message];
                  // update state by adding a new message
                  setDataState((prevState) => ({
                    ...prevState,
                    data: {
                      messages: [
                        ...prevState.data.messages.slice(0, -1),
                        message,
                      ],
                    },
                  }));
                }
              } else {
                const lastChunk =
                  messageChunksRef.current[
                    messageChunksRef?.current.length - 1
                  ];
                // the end of a turn will have an empty content array
                // the stopping of the text stream will also have one
                if (isEmptyChunk && !lastChunk.content[0]) {
                  // console.log('last chunk');
                  messageChunksRef.current = undefined;
                  // update state to not show loading
                  setDataState((prevState) => {
                    // console.log({ prevState });
                    return {
                      ...prevState,
                      isLoading: false,
                    };
                  });
                } else if (toolChunk) {
                  // if its a client tool we can clear the chunks
                  messageChunksRef.current = undefined;
                  // check if its a UI component or just a client tool
                  const { toolUse } = toolChunk;
                  if (toolUse?.name.startsWith('AMPLIFY_UI_')) {
                    setDataState((prevState) => ({
                      ...prevState,
                      isLoading: false,
                      data: {
                        messages: [
                          ...prevState.data.messages.slice(0, -1),
                          message,
                        ],
                      },
                    }));
                    // UI components immediately send a message back to continue the conversation
                    // the way messages are saved with streaming currently,
                    // we don't save a 'toolUse' content block in ddb,
                    // we save 2 text content blocks so we don't need to
                    // return a response. Although we'd need to fix this if
                    // we want client tools (non-ui components)
                    // conversationRef.current?.sendMessage({
                    //   content: [
                    //     {
                    //       toolResult: {
                    //         toolUseId: toolUse.toolUseId,
                    //         content: [
                    //           {
                    //             text: 'displayed component to user',
                    //           },
                    //         ],
                    //       },
                    //     },
                    //   ],
                    //   toolConfiguration,
                    // });
                  }
                } else {
                  // client / ui component tool use will be
                  // empty content -> toolUse block -> empty content
                  messageChunksRef.current.push(message);
                  messageChunksRef.current.sort((a, b) =>
                    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
                  );
                  // merge all message content blocks
                  // some might have text, some might have tool results
                  const content = messageChunksRef.current.reduce(
                    (prev, curr) => {
                      if (curr.content && curr.content.length) {
                        const textBlock = curr.content.find((c) => c.text);
                        const toolUseBlock = curr.content.find(
                          (c) => c.toolUse
                        );

                        if (textBlock) {
                          return prev + textBlock.text;
                        }

                        if (toolUseBlock) {
                          console.log({ toolUseBlock });
                        }
                      }
                      return prev;
                    },
                    ''
                  );
                  // const fullMessage = {
                  //   ...message,
                  //   content: [{ text: content }],
                  // };
                  // set state by updating the last message
                  setDataState((prevState) => ({
                    ...prevState,
                    data: {
                      messages: [
                        ...prevState.data.messages.slice(0, -1),
                        {
                          ...prevState.data.messages[
                            prevState.data.messages.length - 1
                          ],
                          content: [{ text: content }],
                        },
                      ],
                    },
                  }));
                }
              }
            }
          });
        } else {
          // error state
        }
      }

      initialize();

      return () => {
        console.log('cleanup');
        subscription?.unsubscribe();
        setDataState({
          ...INITIAL_STATE,
          data: { messages: [] },
        });
      };
    }, [clientRoute, input.id, routeName]);

    const sendMessage = React.useCallback(
      async (input: SendMesageParameters) => {
        const { content, aiContext, toolConfiguration } = input;
        if (conversationRef.current) {
          setDataState((prevState) => ({
            ...prevState,
            isLoading: true,
            data: {
              // optimistically render message
              messages: [
                ...prevState.data.messages,
                {
                  content,
                  role: 'user',
                  createdAt: new Date().toISOString(),
                  id: 'temp-id',
                  conversationId: conversationRef.current.id,
                },
                {
                  content: [{ text: ' ' }],
                  role: 'assistant',
                  createdAt: new Date().toISOString(),
                  id: 'temp-id-2',
                  conversationId: conversationRef.current.id,
                },
              ],
            },
          }));
          const { data, errors } = await conversationRef.current.sendMessage({
            content,
            aiContext,
            toolConfiguration,
          });
          // handle edge cases
        }
      },
      []
    );

    return [dataState, sendMessage];
  };

  return useAIConversation;
}
