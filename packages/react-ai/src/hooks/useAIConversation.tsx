import React from 'react';
import type {
  Conversation,
  ConversationMessage,
  ConversationRoute,
  ConversationStreamEvent,
  SendMesageParameters,
  SendMessage,
} from '../types';
import type { AiClientState } from './shared';
import { ERROR_STATE, INITIAL_STATE, LOADING_STATE } from './shared';
import { isFunction } from '@aws-amplify/ui';
import { contentFromEvents } from './contentFromEvents';
import { exhaustivelyListMessages } from './exhaustivelyListMessages';

interface UseAIConversationInput {
  id?: string; // should attempt to create a new session id if none is passed
  onMessage?: (message: ConversationMessage) => void;
  // This will return the conversation instance after it has been
  // either created or gotten (if id was provided).
  // This is to allow users to do things like update the
  // URL of the page with the conversation ID so if they
  // refresh the page they can continue the conversation
  onInitialize?: (conversation: Conversation) => void;
}

interface AIConversationState {
  messages: ConversationMessage[];
  conversation?: Conversation;
}

// The "states" the hook can be in
// initial: default, nothing happened yet
// loading: the hook has either hit AppSync to create or get a conversation
// initialized: the hook has successfully gotten a conversation and is ready to rock
const INITIALIZE_REF = ['initial', 'initialLoading', 'initialized'] as const;

function hasStarted(state: (typeof INITIALIZE_REF)[number]) {
  return ['initialLoading', 'initialized'].includes(state);
}

export type UseAIConversationHook<T extends string> = (
  routeName: T,
  input?: UseAIConversationInput
) => [AiClientState<AIConversationState>, SendMessage];

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

  const useAIConversation: UseAIConversationHook<
    Extract<keyof T['conversations'], string>
  > = (routeName: keyof T['conversations'], input = {}) => {
    const clientRoute = (client.conversations as T['conversations'])[routeName];

    // We need to keep track of the stream events as the come in
    // for an assistant message, but don't need to keep them in state
    const contentBlocksRef = React.useRef<
      ConversationStreamEvent[][] | undefined
    >(undefined);
    // Using this hook without an existing conversation id means
    // it will create a new conversation when it is executed
    // we don't want to create 2 conversations
    const initRef = React.useRef<(typeof INITIALIZE_REF)[number]>('initial');

    const [clientState, setClientState] = React.useState<
      AiClientState<AIConversationState>
    >(() => ({
      ...INITIAL_STATE,
      data: { messages: [], conversation: undefined },
    }));

    const { conversation } = clientState.data;
    const { id, onInitialize, onMessage } = input;

    React.useEffect(() => {
      async function initialize() {
        // We don't want to run the effect multiple times
        // because that could create multiple conversation records
        if (hasStarted(initRef.current)) return;
        initRef.current = 'initialLoading';

        // Only show component loading state if we are
        // actually loading messages
        if (id) {
          setClientState({
            ...LOADING_STATE,
            data: { messages: [], conversation: undefined },
          });
        }

        const { data: conversation, errors } = id
          ? await clientRoute.get({ id })
          : await clientRoute.create();

        if (errors ?? !conversation) {
          setClientState({
            ...ERROR_STATE,
            data: { messages: [] },
            messages: errors,
          });
        } else {
          if (id) {
            const { data: messages } = await exhaustivelyListMessages({
              conversation,
            });
            setClientState({
              ...INITIAL_STATE,
              data: { messages, conversation },
            });
          } else {
            setClientState({
              ...INITIAL_STATE,
              data: { conversation, messages: [] },
            });
          }
          initRef.current = 'initialized';
        }
      }

      // this is a runtime guard to make catch an error if
      // the route name wrong, or there is a mismatch
      // between the gen2 schema definition and
      // whats in amplify_outputs
      if (!clientRoute) {
        const error = {
          message: 'Conversation route does not exist',
          errorInfo: null,
          errorType: '',
        };

        setClientState({
          ...ERROR_STATE,
          data: { messages: [] },
          // TODO in MV bump: remove `messages`
          messages: [error],
          errors: [error],
        });
        return;
      }
      initialize();

      return () => {
        contentBlocksRef.current = undefined;
        if (hasStarted(initRef.current)) return;
        setClientState({
          ...INITIAL_STATE,
          data: { messages: [], conversation: undefined },
        });
      };
    }, [clientRoute, id, setClientState]);

    // Run a separate effect that is triggered by the conversation state
    // so that we know we have a conversation object to set up the subscription
    // and also unsubscribe on cleanup
    React.useEffect(() => {
      if (!conversation) return;

      const subscription = conversation.onStreamEvent({
        next: (event) => {
          const {
            // messages have a content block array,
            // this is the index of the content block that was updated
            contentBlockIndex,
            // this is the index of the content chunk, ensure these are in order!
            contentBlockDeltaIndex,
            // this is sent after the last content chunk, verify this matches the
            // previous contentBlockDeltaIndex
            contentBlockDoneAtIndex,
            // this is the final event of the conversation turn
            stopReason,
            conversationId,
            id,
          } = event;

          // return early for content blocks being done
          // or conversation turn being over
          if (contentBlockDoneAtIndex) {
            return;
          }

          // stop reason will signify end of conversation turn
          if (stopReason) {
            // remove loading state from streamed message
            setClientState((prev) => {
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
            onMessage?.({
              id,
              conversationId,
              content: contentFromEvents(contentBlocksRef.current),
              createdAt: new Date().toISOString(),
              role: 'assistant',
              isLoading: true,
            });
            // clear out the stream cache
            contentBlocksRef.current = undefined;
            return;
          }

          // no ref means its the first event for the message stream
          // so lets create the contentBlocks ref or else we will
          // add the incoming event to the right content content block
          if (!contentBlocksRef.current) {
            contentBlocksRef.current = [[event]];
          } else {
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
          }

          setClientState((prev) => {
            const message: ConversationMessage = {
              id,
              conversationId,
              content: contentFromEvents(contentBlocksRef.current),
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
        },
        error: (error) => {
          setClientState((prev) => {
            return {
              ...prev,
              ...ERROR_STATE,
              // TODO in MV bump: remove `messages`
              messages: error.errors,
              errors: error.errors,
            };
          });
        },
      });

      if (isFunction(onInitialize)) {
        onInitialize(conversation);
      }

      return () => {
        contentBlocksRef.current = undefined;
        subscription.unsubscribe();
      };
    }, [conversation, onInitialize, onMessage, setClientState]);

    const handleSendMessage = React.useCallback(
      (input: SendMesageParameters) => {
        const { content } = input;
        if (conversation) {
          setClientState((prevState) => ({
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
        } else {
          const error = {
            message: 'No conversation found',
            errorInfo: null,
            errorType: '',
          };
          setClientState((prev) => ({
            ...prev,
            ...ERROR_STATE,
            // TODO in MV bump: remove `messages`
            messages: [error],
            errors: [error],
          }));
        }
      },
      [conversation]
    );

    return [clientState, handleSendMessage];
  };

  return useAIConversation;
}
