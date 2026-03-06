import type { Conversation, ConversationMessage } from '../types';

interface ExhaustivelyListMessagesParams {
  conversation: Conversation;
  messages?: ConversationMessage[];
  nextToken?: string;
}

export async function exhaustivelyListMessages({
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
