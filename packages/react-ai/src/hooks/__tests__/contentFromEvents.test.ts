import { contentFromEvents } from '../contentFromEvents';
import { ConversationStreamEvent } from '../../types';

describe('contentFromEvents', () => {
  it('returns empty array for undefined input', () => {
    expect(contentFromEvents(undefined)).toEqual([]);
  });

  it('handles sparse arrays from out-of-order events', () => {
    const events = [] as ConversationStreamEvent[];
    events[0] = { text: 'A' } as ConversationStreamEvent;
    events[2] = { text: 'C' } as ConversationStreamEvent;
    // index 1 is undefined (sparse)

    const result = contentFromEvents([events]);
    expect(result[0].text).toBe('AC');
  });

  it('handles normal sequential text events', () => {
    const events = [
      { text: 'Hello ' },
      { text: 'world' },
    ] as ConversationStreamEvent[];
    const result = contentFromEvents([events]);
    expect(result[0].text).toBe('Hello world');
  });

  it('handles toolUse content blocks', () => {
    const toolUse = { name: 'test', input: {} };
    const events = [{ toolUse }] as unknown as ConversationStreamEvent[];
    const result = contentFromEvents([events]);
    expect(result[0]).toEqual({ toolUse });
  });

  it('handles empty content blocks array', () => {
    expect(contentFromEvents([])).toEqual([]);
  });
});
