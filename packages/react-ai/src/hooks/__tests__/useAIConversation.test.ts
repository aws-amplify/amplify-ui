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
});
