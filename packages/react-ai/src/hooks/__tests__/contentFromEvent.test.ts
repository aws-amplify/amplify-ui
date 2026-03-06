import { contentFromEvents } from '../contentFromEvents';
import { ConversationStreamEvent } from '../../types';

describe('contentFromEvents', () => {
  it('should return empty array when contentBlocks is undefined', () => {
    const result = contentFromEvents(undefined);
    expect(result).toEqual([]);
  });

  it('should combine text events into a single text block', () => {
    const events: ConversationStreamEvent[][] = [
      [
        {
          text: 'Hello',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          contentBlockDeltaIndex: 0,
          associatedUserMessageId: '123',
        },
        {
          text: ' ',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          contentBlockDeltaIndex: 1,
          associatedUserMessageId: '123',
        },
        {
          text: 'world',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          contentBlockDeltaIndex: 2,
          associatedUserMessageId: '123',
        },
      ],
    ];

    const result = contentFromEvents(events);
    expect(result).toEqual([{ text: 'Hello world' }]);
  });

  it('should handle multiple text blocks', () => {
    const events: ConversationStreamEvent[][] = [
      [
        {
          text: 'First block',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          contentBlockDeltaIndex: 0,
          associatedUserMessageId: '123',
        },
      ],
      [
        {
          text: 'Second block',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 1,
          contentBlockDeltaIndex: 0,
          associatedUserMessageId: '123',
        },
      ],
    ];

    const result = contentFromEvents(events);
    expect(result).toEqual([{ text: 'First block' }, { text: 'Second block' }]);
  });

  it('should handle toolUse events', () => {
    const toolUseEvent = { name: 'testTool', input: 'test', toolUseId: '1234' };
    const events: ConversationStreamEvent[][] = [
      [
        {
          toolUse: toolUseEvent,
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          associatedUserMessageId: '123',
        },
      ],
    ];

    const result = contentFromEvents(events);
    expect(result).toEqual([{ toolUse: toolUseEvent }]);
  });

  it('should handle mixed text and toolUse blocks', () => {
    const toolUseEvent = { name: 'testTool', input: 'test', toolUseId: '123' };
    const events: ConversationStreamEvent[][] = [
      [
        {
          text: 'Before tool',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 0,
          contentBlockDeltaIndex: 0,
          associatedUserMessageId: '123',
        },
      ],
      [
        {
          toolUse: toolUseEvent,
          id: '123',
          conversationId: '123',
          contentBlockIndex: 1,
          associatedUserMessageId: '123',
        },
      ],
      [
        {
          text: 'After tool',
          id: '123',
          conversationId: '123',
          contentBlockIndex: 2,
          contentBlockDeltaIndex: 0,
          associatedUserMessageId: '123',
        },
      ],
    ];

    const result = contentFromEvents(events);
    expect(result).toEqual([
      { text: 'Before tool' },
      { toolUse: toolUseEvent },
      { text: 'After tool' },
    ]);
  });

  it('should handle empty content blocks array', () => {
    const events: ConversationStreamEvent[][] = [];
    const result = contentFromEvents(events);
    expect(result).toEqual([]);
  });
});
