import React from 'react';
import { DataState } from '@aws-amplify/ui-react-core';
import {
  Conversation,
  ConversationMessage,
  ConversationRoute,
  ConversationStreamEvent,
  GraphQLFormattedError,
  SendMesageParameters,
  SendMessage,
  ToolUseContent,
} from '../types';
import { ERROR_STATE, INITIAL_STATE, LOADING_STATE } from './shared';
import { isFunction } from '@aws-amplify/ui';

// function createNewConversationMessageInRoute({
//   previousValue,
//   routeName,
//   conversationId,
//   messages,
// }: {
//   previousValue: RouteToConversations;
//   routeName: string;
//   conversationId: string;
//   messages: ConversationMessage[];
// }) {
//   return {
//     ...previousValue,
//     [routeName]: {
//       ...previousValue[routeName],
//       [conversationId]: messages,
//     },
//   };
// }

interface ExhaustivelyListMessagesParams {
  conversation: Conversation;
  messages?: ConversationMessage[];
  nextToken?: string;
}

async function exhaustivelyListMessages({
  conversation,
  messages = [],
  nextToken,
}: ExhaustivelyListMessagesParams): ReturnType<Conversation['listMessages']> {
  const result = await conversation.listMessages({ nextToken });
  if (result.data) {
    messages?.push(...result.data);
  }
  if (result.nextToken) {
    return exhaustivelyListMessages({
      conversation,
      messages,
      nextToken: result.nextToken,
    });
  }
  return {
    ...result,
    data: messages,
  };
}

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onMessage?: (message: ConversationMessage) => void;
  onInitialize?: (conversation: Conversation) => void;
}

interface AIConversationState {
  messages: ConversationMessage[];
  conversation?: Conversation;
}

type ConversationState<T> = Omit<DataState<T>, 'message'> & {
  messages?: GraphQLFormattedError[];
};

export type UseAIConversationHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [ConversationState<AIConversationState>, SendMessage];

export function createUseAIConversation<
  T extends Record<'conversations', Record<string, ConversationRoute>>,
>(client: T): UseAIConversationHook<Extract<keyof T['conversations'], string>> {
  // This is a bit complicated so buckle up.
  // The way the data client works is conversation.get() or conversation.create()
  // is an async function because it makes a graphql call to appsync
  // then it returns a conversation object, which is like a normal
  // data client record, except that it also has functions on it,
  // like sendMessage and onStreamEvent. onStreamEvent sets up a
  // subscription using a websocket connection, which ideally we only want to
  // do once per conversation. Because we can only subscribe AFTER the
  // async call to get/create the conversation is made, the cleanup
  // function in the effect will won't actually unsubscribe
  const stableConversationMap: Record<
    string,
    {
      subscription?: ReturnType<Conversation['onStreamEvent']>;
      conversation: Conversation;
    }
  > = {};

  const useAIConversation: UseAIConversationHook<
    Extract<keyof T['conversations'], string>
  > = (routeName: keyof T['conversations'], input = {}) => {
    const clientRoute = (client.conversations as T['conversations'])[routeName];

    // We are using stable refs here because we need to keep
    // track of state that is updating frequently and we don't want
    // to be creating new websocket connections
    const contentBlocksRef = React.useRef<ConversationStreamEvent[][]>();

    const [dataState, setDataState] = React.useState<
      ConversationState<AIConversationState>
    >(() => ({
      ...INITIAL_STATE,
      data: { messages: [], conversation: undefined },
    }));

    const { conversation } = dataState.data;
    const { id, onInitialize } = input;

    React.useEffect(() => {
      async function initialize() {
        // console.log('initializing', input.id);

        setDataState({
          ...LOADING_STATE,
          data: { messages: [], conversation: undefined },
        });

        const { data: conversation, errors } = id
          ? await clientRoute.get({ id })
          : await clientRoute.create();

        if (errors ?? !conversation) {
          setDataState({
            ...ERROR_STATE,
            data: { messages: [] },
            messages: errors,
          });
        } else {
          if (id) {
            const { data: messages } = await exhaustivelyListMessages({
              conversation,
            });
            setDataState({
              ...INITIAL_STATE,
              data: { messages, conversation },
            });
          } else {
            setDataState({
              ...INITIAL_STATE,
              data: { conversation, messages: [] },
            });
          }

          if (stableConversationMap[conversation.id]?.subscription) {
            stableConversationMap[conversation.id].subscription?.unsubscribe();
          }

          const subscription = conversation.onStreamEvent((event) => {
            const {
              // messages have a content block array,
              // this is the index of the content block that was updated
              contentBlockIndex,
              // this is the index of the content chunk, ensure these are in order!
              contentBlockDeltaIndex,
              // this is sent after the last content chunk, verify this matches the
              // previous contentBlockDeltaIndex
              contentBlockDoneAtIndex,
              // this is the text of the content block
              contentBlockText,
              // this is a toolUse block, will always come in a single event
              // contentBlockToolUse,
              // this is the final event of the conversation turn
              stopReason,
              conversationId,
              // associatedUserMessageId,
              // @ts-expect-error will fix
              id,
            } = event;

            // return early for content blocks being done
            // or conversation turn being over
            if (contentBlockDoneAtIndex) {
              return;
            }

            // stop reason will signify end of conversation turn
            if (stopReason) {
              // clear out the stream cache
              contentBlocksRef.current = undefined;
              // remove loading state from streamed message
              setDataState((prev) => {
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    messages: prev.data.messages.map((message) => ({
                      ...message,
                      isLoading: false,
                    })),
                  },
                };
              });
              return;
            }

            // no ref means its the first event for the message stream
            if (!contentBlocksRef.current) {
              contentBlocksRef.current = [[event]];

              setDataState((prev) => {
                const message: ConversationMessage = {
                  id,
                  conversationId,
                  // TODO: use better logic here
                  content: [{ text: contentBlockText ?? '' }],
                  createdAt: new Date().toISOString(),
                  role: 'assistant',
                  isLoading: true,
                };
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    messages: [...prev.data.messages.slice(0, -1), message],
                  },
                };
              });
              return;
            }

            // place the incoming event in the right content block
            // and order. message content is an array so a single message
            // can have multiple content blocks, and each content block
            // can have multiple events/chunks
            const currentBlock = contentBlocksRef.current[contentBlockIndex];
            if (!currentBlock) {
              contentBlocksRef.current[contentBlockIndex] = [event];
            } else {
              contentBlocksRef.current[contentBlockIndex] = [
                ...currentBlock.slice(0, contentBlockDeltaIndex),
                event,
                ...currentBlock.slice(contentBlockDeltaIndex),
              ];
            }

            const content = contentBlocksRef.current.map((contentBlock) => {
              const isTextBlock = contentBlock.some(
                (event) => event.contentBlockText
              );
              if (isTextBlock) {
                return {
                  text: contentBlock
                    .map((event) => {
                      return event.contentBlockText;
                    })
                    .join(''),
                };
              }
              // tool use is never chunked
              if (contentBlock[0].contentBlockToolUse) {
                return {
                  ...(JSON.parse(
                    contentBlock[0].contentBlockToolUse
                  ) as ToolUseContent),
                };
              }
            }) as ConversationMessage['content'];

            setDataState((prev) => {
              const message: ConversationMessage = {
                id,
                conversationId,
                content,
                createdAt: new Date().toISOString(),
                role: 'assistant',
                isLoading: true,
              };
              return {
                ...prev,
                data: {
                  ...prev.data,
                  // TODO: we are assuming we only update the last
                  // message, but maybe we should match it by message ID?
                  messages: [...prev.data.messages.slice(0, -1), message],
                },
              };
            });
          });

          stableConversationMap[conversation.id] = {
            conversation,
            subscription,
          };
          if (isFunction(onInitialize)) {
            onInitialize(conversation);
          }
        }
      }

      initialize();

      return () => {
        // console.log('clean up');
        const stableConversation = stableConversationMap[id ?? ''];
        if (stableConversation) {
          stableConversation.subscription?.unsubscribe();
        } else {
          // console.log('no subscription');
        }
        contentBlocksRef.current = undefined;
        setDataState({
          ...INITIAL_STATE,
          data: { messages: [], conversation: undefined },
        });
      };
    }, [clientRoute, id, onInitialize, setDataState]);

    const handleSendMessage = React.useCallback(
      (input: SendMesageParameters) => {
        const { content } = input;
        if (conversation) {
          setDataState((prevState) => ({
            ...prevState,
            data: {
              ...prevState.data,
              // optimistically add user and assistant messages
              messages: [
                ...prevState.data.messages,
                {
                  content,
                  role: 'user',
                  createdAt: new Date().toISOString(),
                  id: 'temp-id',
                  conversationId: conversation.id ?? '',
                },
                {
                  content: [{ text: ' ' }],
                  role: 'assistant',
                  createdAt: new Date().toISOString(),
                  id: 'temp-id-2',
                  conversationId: conversation.id ?? '',
                  isLoading: true,
                },
              ],
            },
          }));
          conversation.sendMessage(input);
          // handle edge cases
        } else {
          // console.error('no conversation');
        }
      },
      [conversation]
    );

    return [dataState, handleSendMessage];
  };

  return useAIConversation;
}
