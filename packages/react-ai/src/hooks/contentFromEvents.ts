/* eslint-disable no-console */
import type { ConversationMessage, ConversationStreamEvent } from '../types';

export const contentFromEvents = (
  contentBlocks?: ConversationStreamEvent[][]
): ConversationMessage['content'] => {
  console.log('[AMPLIFY-AI-CONTENT] 🔄 Processing content from events', {
    hasContentBlocks: !!contentBlocks,
    blockCount: contentBlocks?.length || 0,
    totalEvents: contentBlocks?.reduce((sum, block) => sum + (block?.length || 0), 0) || 0
  });

  if (!contentBlocks) {
    console.log('[AMPLIFY-AI-CONTENT] ⚠️ No content blocks provided');
    return [];
  }

  const result = contentBlocks.map((contentBlock, blockIndex) => {
    // Filter out sparse array holes from out-of-order direct index assignment
    const events = contentBlock.filter(Boolean);
    const isTextBlock = events.some((event) => event.text);
    
    console.log('[AMPLIFY-AI-CONTENT] 📝 Processing content block', {
      blockIndex,
      eventCount: events.length,
      isTextBlock,
      hasToolUse: !!events[0]?.toolUse
    });

    if (isTextBlock) {
      const text = events
        .map((event) => event.text ?? '')
        .join('');
      
      console.log('[AMPLIFY-AI-CONTENT] 📝 Text block processed', {
        blockIndex,
        textLength: text.length,
        textPreview: text.substring(0, 100) + '...'
      });

      return { text };
    }
    // tool use is never chunked
    if (events[0]?.toolUse) {
      console.log('[AMPLIFY-AI-CONTENT] 🔧 Tool use block processed', {
        blockIndex,
        toolName: events[0].toolUse.name
      });
      return { toolUse: events[0].toolUse };
    }
  }) as ConversationMessage['content'];

  console.log('[AMPLIFY-AI-CONTENT] ✅ Content processing completed', {
    resultBlockCount: result.length,
    totalTextLength: result.reduce((sum, block) => sum + (block?.text?.length || 0), 0)
  });

  return result;
};
