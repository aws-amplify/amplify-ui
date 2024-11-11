import { act, renderHook } from '@testing-library/react-hooks';
import { createAIHooks } from '../createAIHooks';

const listMessageMock = jest.fn().mockResolvedValue({ data: [] });
const sendMessageMock = jest.fn().mockResolvedValue({ data: {} });
const onMessageMock = jest.fn().mockReturnValue({ unsubscribe: jest.fn() });
const onStreamEventMock = jest
  .fn()
  .mockImplementation(() => {
    return { unsubscribe: jest.fn() };
  })
  .mockReturnValue({ unsubscribe: jest.fn() });
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

    const { result, waitForNextUpdate } = renderHook(() =>
      useAIConversation('pirateChat')
    );
    await waitForNextUpdate();
    const [
      {
        data: { messages },
      },
      sendMessage,
    ] = result.current;
    expect(messages).toHaveLength(0);
    expect(sendMessage).toBeDefined();
  });

  it('hook can send a message which updates state', async () => {
    const client = new mockClient();
    const { useAIConversation } = createAIHooks(client);

    expect(useAIConversation).toBeDefined();

    const { result, waitForNextUpdate } = renderHook(() =>
      useAIConversation('pirateChat')
    );

    await waitForNextUpdate();

    const [_data, sendMessage] = result.current;

    act(() => {
      sendMessage({ content: [{ text: '' }] });
    });

    expect(result.current[0].data.messages).toHaveLength(2);
    expect(sendMessageMock).toHaveBeenCalled();
  });

  // it('hook can receive new messages from the conversation subscription', async () => {
  //   const client = new mockClient();
  //   const { useAIConversation } = createAIHooks(client);

  //   expect(useAIConversation).toBeDefined();

  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useAIConversation('pirateChat')
  //   );

  //   await waitForNextUpdate();

  //   const [_data, sendMessage] = result.current;

  //   act(() => {
  //     sendMessage({ content: [{ text: 'foobar' }] });
  //   });

  //   expect(result.current[0].data.messages).toHaveLength(2);

  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   const onStreamHandler: Parameters<Conversation['onStreamEvent']>[0] =
  //     onStreamEventMock.mock.calls[0][0];
  //   act(() => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     onStreamHandler({
  //       contentBlockIndex: 0,
  //       contentBlockDeltaIndex: 1,
  //       conversationId: '1',
  //       associatedUserMessageId: '2',
  //       id: '3',
  //     });
  //   });
  //   expect(result.current[0].data.messages).toHaveLength(3);
  // });
});
