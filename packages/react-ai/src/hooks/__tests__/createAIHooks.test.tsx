import { act, renderHook } from '@testing-library/react-hooks';
import { createAIHooks } from '../createAIHooks';

const listMessageMock = jest.fn().mockResolvedValue({ data: [] });
const sendMessageMock = jest.fn().mockResolvedValue({ data: {} });
const onMessageMock = jest.fn().mockReturnValue({ unsubscribe: jest.fn() });
const generateRecipeMock = jest.fn();
const id = 'foobar';

const mockGet = jest.fn().mockImplementation(() => {
  return {
    data: {
      id: id,
      listMessages: listMessageMock,
      sendMessage: sendMessageMock,
      onMessage: onMessageMock,
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

describe('createAIHooks', () => {
  beforeEach(() => {
    listMessageMock.mockResolvedValue({
      data: [{ content: [{ text: 'asdf' }] }],
    });
    onMessageMock.mockReset();
  });

  it('returns an useAIGeneration and useAIConversation hooks', () => {
    const client = new mockClient();
    const { useAIConversation, useAIGeneration } = createAIHooks(client);

    expect(useAIConversation).toBeDefined();
    expect(useAIGeneration).toBeDefined();
  });

  describe('useAIConversation', () => {
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
      expect(messages).toHaveLength(1);
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

      sendMessage({ content: ['foobar'] as unknown as any });
      await waitForNextUpdate();
      expect(result.current[0].data.messages).toHaveLength(2);
      expect(sendMessageMock).toHaveBeenCalled();
    });

    it('hook can receive new messages from the conversation subscription', async () => {
      const client = new mockClient();
      const { useAIConversation } = createAIHooks(client);

      expect(useAIConversation).toBeDefined();

      const { result, waitForNextUpdate } = renderHook(() =>
        useAIConversation('pirateChat')
      );
      await waitForNextUpdate();
      const [_data, sendMessage] = result.current;

      sendMessage({ content: ['foobar'] as unknown as any });
      await waitForNextUpdate();
      expect(result.current[0].data.messages).toHaveLength(2);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const onMessageHandler = onMessageMock.mock.calls[0][0];
      act(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onMessageHandler({ content: [{ text: 'Pirate responding' }] });
      });
      expect(result.current[0].data.messages).toHaveLength(3);
    });

    it('hook can receive new messages and calls a custom onResponse function', async () => {
      const client = new mockClient();
      const { useAIConversation } = createAIHooks(client);

      expect(useAIConversation).toBeDefined();

      const onResponse = jest.fn();
      const { result, waitForNextUpdate } = renderHook(() =>
        useAIConversation('pirateChat', { onResponse })
      );
      await waitForNextUpdate();
      const [_data, sendMessage] = result.current;

      sendMessage({ content: ['foobar'] as unknown as any });
      await waitForNextUpdate();
      expect(result.current[0].data.messages).toHaveLength(2);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const onMessageHandler = onMessageMock.mock.calls[0][0];
      act(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onMessageHandler({ content: [{ text: 'Pirate responding' }] });
      });
      expect(result.current[0].data.messages).toHaveLength(3);
      expect(onResponse).toHaveBeenCalled();
    });
  });

  describe('useAIGeneration', () => {
    it('returns a result', async () => {
      const client = new mockClient();
      const expectedResult = {
        recipe: 'This is a recipe for chocolate cake that tastes bad',
      };
      const generateReturn = {
        data: expectedResult,
      };
      generateRecipeMock.mockResolvedValueOnce(generateReturn);
      const { useAIGeneration } = createAIHooks(client);

      const { result: hookResult, waitForNextUpdate } = renderHook(() =>
        useAIGeneration('generateRecipe')
      );

      const [_result, generate] = hookResult.current;
      act(() => {
        generate({
          description: 'I want a recipe for a gluten-free chocolate cake.',
        });
      });

      const [loadingState] = hookResult.current;
      expect(loadingState.isLoading).toBeTruthy();

      await waitForNextUpdate();

      const [awaitedState] = hookResult.current;
      expect(awaitedState.data).toStrictEqual(expectedResult);
    });

    it('returns a result with graphqlErrors', async () => {
      const client = new mockClient();
      const expectedResult = {
        recipe: 'This is a recipe for chocolate cake that tastes bad',
      };
      const generateReturn = {
        data: expectedResult,
        errors: [
          {
            errorType: '',
            locations: [],
            path: ['generateRecipe'],
            message: 'this is just one error',
          },
        ],
      };
      generateRecipeMock.mockResolvedValueOnce(generateReturn);
      const { useAIGeneration } = createAIHooks(client);

      const { result: hookResult, waitForNextUpdate } = renderHook(() =>
        useAIGeneration('generateRecipe')
      );

      const [_result, generate] = hookResult.current;
      act(() => {
        generate({
          description: 'I want a recipe for a gluten-free chocolate cake.',
        });
      });

      const [loadingState] = hookResult.current;
      expect(loadingState.isLoading).toBeTruthy();

      await waitForNextUpdate();

      const [awaitedState] = hookResult.current;
      expect(awaitedState.data).toStrictEqual(expectedResult);
      expect(awaitedState.isLoading).toBeFalsy();
      expect(awaitedState.hasError).toBeTruthy();
      expect(awaitedState.messages).toHaveLength(1);
      expect(awaitedState.messages?.[0].message).toContain('error');
    });
  });
});
