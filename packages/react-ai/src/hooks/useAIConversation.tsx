/* eslint-disable no-console */
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
        console.log('[AMPLIFY-AI-CONVERSATION] 🚀 Initialize effect started', {
          routeName,
          conversationId: id,
          initRef: initRef.current,
          timestamp: new Date().toISOString()
        });

        // We don't want to run the effect multiple times
        // because that could create multiple conversation records
        if (hasStarted(initRef.current)) {
          console.log('[AMPLIFY-AI-CONVERSATION] ⏭️ Initialize already started, skipping', {
            initRef: initRef.current
          });
          return;
        }
        initRef.current = 'initialLoading';

        console.log('[AMPLIFY-AI-CONVERSATION] 🔄 Setting loading state', {
          hasExistingId: !!id
        });

        // Only show component loading state if we are
        // actually loading messages
        if (id) {
          setClientState({
            ...LOADING_STATE,
            data: { messages: [], conversation: undefined },
          });
        }

        console.log('[AMPLIFY-AI-CONVERSATION] 📡 Making conversation API call', {
          action: id ? 'get' : 'create',
          conversationId: id
        });

        const { data: conversation, errors } = id
          ? await clientRoute.get({ id })
          : await clientRoute.create();

        console.log('[AMPLIFY-AI-CONVERSATION] 📡 Conversation API response', {
          hasConversation: !!conversation,
          hasErrors: !!errors,
          conversationId: conversation?.id,
          errorCount: errors?.length || 0
        });

        if (errors ?? !conversation) {
          console.error('[AMPLIFY-AI-CONVERSATION] ❌ Conversation initialization failed', {
            errors,
            hasConversation: !!conversation
          });
          setClientState({
            ...ERROR_STATE,
            data: { messages: [] },
            messages: errors,
          });
        } else {
          if (id) {
            console.log('[AMPLIFY-AI-CONVERSATION] 📚 Loading existing messages', {
              conversationId: conversation.id
            });
            const { data: messages } = await exhaustivelyListMessages({
              conversation,
            });
            console.log('[AMPLIFY-AI-CONVERSATION] 📚 Messages loaded', {
              messageCount: messages.length,
              conversationId: conversation.id
            });
            setClientState({
              ...INITIAL_STATE,
              data: { messages, conversation },
            });
          } else {
            console.log('[AMPLIFY-AI-CONVERSATION] 🆕 New conversation created', {
              conversationId: conversation.id
            });
            setClientState({
              ...INITIAL_STATE,
              data: { conversation, messages: [] },
            });
          }
          initRef.current = 'initialized';
          
          console.log('[AMPLIFY-AI-CONVERSATION] ✅ Initialize completed successfully', {
            conversationId: conversation.id,
            messageCount: id ? 'loaded from existing' : 0
          });
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

        console.error('[AMPLIFY-AI-CONVERSATION] ❌ Route validation failed', {
          routeName,
          error: error.message
        });

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
          console.log('[AMPLIFY-AI-STREAM] 📨 Stream event received', {
            eventType: event.contentBlockDoneAtIndex ? 'contentBlockDone' : 
                      event.stopReason ? 'stopReason' : 'contentDelta',
            contentBlockIndex: event.contentBlockIndex,
            contentBlockDeltaIndex: event.contentBlockDeltaIndex,
            contentBlockDoneAtIndex: event.contentBlockDoneAtIndex,
            stopReason: event.stopReason,
            conversationId: event.conversationId,
            messageId: event.id,
            timestamp: new Date().toISOString()
          });

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
            console.log('[AMPLIFY-AI-STREAM] ✅ Content block completed', {
              contentBlockIndex,
              contentBlockDoneAtIndex,
              conversationId
            });
            return;
          }

          // stop reason will signify end of conversation turn
          if (stopReason) {
            console.log('[AMPLIFY-AI-STREAM] 🛑 Stream completed', {
              stopReason,
              conversationId,
              messageId: id,
              totalContentBlocks: contentBlocksRef.current?.length || 0
            });

            // remove loading state from streamed message
            setClientState((prev) => {
              const updatedMessages = prev.data.messages.map((message) => ({
                ...message,
                isLoading: false,
              }));
              
              console.log('[AMPLIFY-AI-STREAM] 🔄 Removing loading state', {
                messageCount: updatedMessages.length,
                conversationId
              });

              return {
                ...prev,
                data: {
                  ...prev.data,
                  messages: updatedMessages,
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
            console.log('[AMPLIFY-AI-STREAM] 🧹 Stream cache cleared');
            return;
          }

          // no ref means its the first event for the message stream
          // so lets create the contentBlocks ref or else we will
          // add the incoming event to the right content content block
          if (!contentBlocksRef.current) {
            console.log('[AMPLIFY-AI-STREAM] 🆕 First stream event, initializing content blocks', {
              contentBlockIndex,
              contentBlockDeltaIndex,
              conversationId
            });
            contentBlocksRef.current = [[event]];
          } else {
            // place the incoming event in the right content block
            // and order. message content is an array so a single message
            // can have multiple content blocks, and each content block
            // can have multiple events/chunks
            const currentBlock = contentBlocksRef.current[contentBlockIndex];
            if (!currentBlock) {
              console.log('[AMPLIFY-AI-STREAM] 📝 Creating new content block', {
                contentBlockIndex,
                contentBlockDeltaIndex,
                totalBlocks: contentBlocksRef.current.length
              });
              contentBlocksRef.current[contentBlockIndex] = [event];
            } else {
              // Direct index assignment: idempotent, handles out-of-order and duplicates
              if (contentBlockDeltaIndex !== undefined) {
                console.log('[AMPLIFY-AI-STREAM] 📝 Adding content delta to existing block', {
                  contentBlockIndex,
                  contentBlockDeltaIndex,
                  blockSize: currentBlock.length,
                  eventText: event.text?.substring(0, 50) + '...'
                });
                currentBlock[contentBlockDeltaIndex] = event;
              } else {
                console.log('[AMPLIFY-AI-STREAM] 📝 Pushing content to existing block', {
                  contentBlockIndex,
                  blockSize: currentBlock.length,
                  eventText: event.text?.substring(0, 50) + '...'
                });
                currentBlock.push(event);
              }
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

            console.log('[AMPLIFY-AI-STREAM] 🔄 Updating message state', {
              messageId: id,
              contentLength: message.content?.[0]?.text?.length || 0,
              contentPreview: message.content?.[0]?.text?.substring(0, 100) + '...',
              totalContentBlocks: contentBlocksRef.current?.length || 0,
              conversationId
            });

            // Match by message ID instead of assuming last message
            const existingIndex = prev.data.messages.findIndex(
              (m) => m.id === id
            );

            const updatedMessages =
              existingIndex >= 0
                ? [
                    ...prev.data.messages.slice(0, existingIndex),
                    message,
                    ...prev.data.messages.slice(existingIndex + 1),
                  ]
                : [...prev.data.messages, message];

            return {
              ...prev,
              data: {
                ...prev.data,
                messages: updatedMessages,
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
        console.log('[AMPLIFY-AI-SEND] 🚀 Send message initiated', {
          hasConversation: !!conversation,
          conversationId: conversation?.id,
          contentLength: input.content?.[0]?.text?.length || 0,
          contentPreview: input.content?.[0]?.text?.substring(0, 100) + '...',
          timestamp: new Date().toISOString()
        });

        const { content } = input;
        if (conversation) {
          console.log('[AMPLIFY-AI-SEND] 📝 Adding optimistic messages to state', {
            conversationId: conversation.id,
            currentMessageCount: clientState.data.messages.length
          });

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

          console.log('[AMPLIFY-AI-SEND] 📡 Calling conversation.sendMessage', {
            conversationId: conversation.id
          });

          conversation.sendMessage(input);
        } else {
          const error = {
            message: 'No conversation found',
            errorInfo: null,
            errorType: '',
          };

          console.error('[AMPLIFY-AI-SEND] ❌ Send message failed - no conversation', {
            error: error.message
          });

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
