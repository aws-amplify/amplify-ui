import type { ConversationMessage, ConversationStreamEvent } from '../types';

export const contentFromEvents = (
  contentBlocks?: ConversationStreamEvent[][]
): ConversationMessage['content'] => {
  if (!contentBlocks) return [];
  return contentBlocks.map((contentBlock) => {
    const isTextBlock = contentBlock.some((event) => event.text);
    if (isTextBlock) {
      return {
        text: contentBlock
          .map((event) => {
            return event.text;
          })
          .join(''),
      };
    }
    // tool use is never chunked
    if (contentBlock[0].toolUse) {
      return { toolUse: contentBlock[0].toolUse };
    }
  }) as ConversationMessage['content'];
};
