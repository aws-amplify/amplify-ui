import { act, renderHook, waitFor } from '@testing-library/react';
import { createAIHooks } from '../createAIHooks';
import { ConversationStreamEvent } from '../../types';

let _next: any;

const listMessageMock = jest.fn().mockResolvedValue({ data: [] });
const sendMessageMock = jest.fn().mockResolvedValue({ data: {} });
const onMessageMock = jest.fn().mockReturnValue({ unsubscribe: jest.fn() });
const onStreamEventMock = jest
  .fn()
  .mockImplementation(
    ({ next }: { next: (message: ConversationStreamEvent) => void }) => {
      _next = next;
      return { unsubscribe: jest.fn() };
    }
  );

const generateRecipeMock = jest.fn();
const id = 'foobar';

const mockGet = jest.fn().mockImplementation(() => {
  return {
    data: {
      id: id,
      listMessages: listMessageMock,
      sendMessage: sendMessageMock,
      onMessage: onMessageMock,
      onStreamEvent: onStreamEventMock,
    },
  };
});
const mockCreate = mockGet;
const mockClient = jest.fn().mockImplementation(() => {
  return {
    conversations: {
      pirateChat: {
        get: mockGet,
        create: mockCreate,
      },
    },
    generations: {
      generateRecipe: generateRecipeMock,
    },
  };
});

describe('useAIConverstion', () => {
  beforeEach(() => {
    listMessageMock.mockResolvedValue({
      data: [{ content: [{ text: 'asdf' }] }],
    });
    onMessageMock.mockReset();
  });

  it('returns some messages and a sendMessage function', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);

    expect(useAIConversation).toBeDefined();

    const { result } = renderHook(() => useAIConversation('pirateChat'));
    await waitFor(() => {
      const [
        {
          data: { messages },
        },
        sendMessage,
      ] = result.current;
      expect(messages).toHaveLength(0);
      expect(sendMessage).toBeDefined();
    });
  });

  it('hook can send a message which updates state', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);

    expect(useAIConversation).toBeDefined();

    const { result } = renderHook(() => useAIConversation('pirateChat'));

    const initState = result.current[0];

    expect(initState.data.conversation).toBeUndefined();

    await waitFor(() => {
      const nextState = result.current[0];
      expect(nextState.data.conversation).toBeDefined();
    });

    const sendMessage = result.current[1];

    act(() => {
      sendMessage({ content: [{ text: '' }] });
    });

    await waitFor(() => {
      expect(result.current[0].data.messages).toHaveLength(2);
      expect(sendMessageMock).toHaveBeenCalled();
    });
  });

  it('can call onInitialize', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);
    const onInitialize = jest.fn();

    expect(useAIConversation).toBeDefined();

    renderHook(() =>
      useAIConversation('pirateChat', {
        onInitialize,
      })
    );

    await waitFor(() => {
      expect(onInitialize).toHaveBeenCalledTimes(1);
    });
  });

  it('should fire onMessage', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);
    const onMessage = jest.fn();
    const { result } = renderHook(() =>
      useAIConversation('pirateChat', { onMessage })
    );

    await waitFor(() => {
      const [_data] = result.current;

      act(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        _next({
          stopReason: 'end_turn',
          conversationId: 'XXX',
          id: '123',
          contentBlockIndex: 0,
          associatedUserMessageId: 'XXX',
        });
      });

      expect(onMessage).toHaveBeenCalled();
    });
  });

  it('handles duplicate stream events without content corruption', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);
    const { result } = renderHook(() => useAIConversation('pirateChat'));

    await waitFor(() => {
      expect(result.current[0].data.conversation).toBeDefined();
    });

    act(() => {
      result.current[1]({ content: [{ text: 'hello' }] });
    });

    await waitFor(() => {
      expect(result.current[0].data.messages).toHaveLength(2);
    });

    // Simulate streaming with a duplicate event (subscription replay)
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 0,
        text: 'Hello ',
      });
    });

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 1,
        text: 'world',
      });
    });

    // Duplicate of delta 0 (subscription replay)
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 0,
        text: 'Hello ',
      });
    });

    await waitFor(() => {
      const [
        {
          data: { messages },
        },
      ] = result.current;
      const assistantMsg = messages.find((m) => m.id === '123');
      // Should be "Hello world", NOT "Hello Hello world"
      const { text } = assistantMsg?.content[0] ?? {};
      expect(text).toBe('Hello world');
    });
  });

  it('handles out-of-order stream events correctly', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);
    const { result } = renderHook(() => useAIConversation('pirateChat'));

    await waitFor(() => {
      expect(result.current[0].data.conversation).toBeDefined();
    });

    act(() => {
      result.current[1]({ content: [{ text: 'hello' }] });
    });

    await waitFor(() => {
      expect(result.current[0].data.messages).toHaveLength(2);
    });

    // Events arrive out of order: 0, 2, 1
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 0,
        text: 'A',
      });
    });

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 2,
        text: 'C',
      });
    });

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      _next({
        id: '123',
        conversationId: id,
        contentBlockIndex: 0,
        contentBlockDeltaIndex: 1,
        text: 'B',
      });
    });

    await waitFor(() => {
      const [
        {
          data: { messages },
        },
      ] = result.current;
      const assistantMsg = messages.find((m) => m.id === '123');
      const { text } = assistantMsg?.content[0] ?? {};
      expect(text).toBe('ABC');
    });
  });
});
