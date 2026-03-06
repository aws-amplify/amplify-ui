import type { ConversationMessage, ConversationStreamEvent } from '../types';

export const contentFromEvents = (
  contentBlocks?: ConversationStreamEvent[][]
): ConversationMessage['content'] => {
  if (!contentBlocks) return [];
  return contentBlocks.map((contentBlock) => {
    // Filter out sparse array holes from out-of-order direct index assignment
    const events = contentBlock.filter(Boolean);
    const isTextBlock = events.some((event) => event.text);
    if (isTextBlock) {
      return {
        text: events
          .map((event) => event.text ?? '')
          .join(''),
      };
    }
    // tool use is never chunked
    if (events[0]?.toolUse) {
      return { toolUse: events[0].toolUse };
    }
  }) as ConversationMessage['content'];
};
