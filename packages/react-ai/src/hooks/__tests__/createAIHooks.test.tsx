import { act, renderHook, waitFor } from '@testing-library/react';
import { createAIHooks } from '../createAIHooks';

const listMessageMock = jest.fn().mockResolvedValue({ data: [] });
const sendMessageMock = jest.fn().mockResolvedValue({ data: {} });
const onMessageMock = jest.fn().mockReturnValue({ unsubscribe: jest.fn() });
const onStreamEventMock = jest.fn().mockReturnValue({ unsubscribe: jest.fn() });
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

      const { result: hookResult } = renderHook(() =>
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

      await waitFor(() => {
        const [awaitedState] = hookResult.current;
        expect(awaitedState.data).toStrictEqual(expectedResult);
      });
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

      const { result: hookResult } = renderHook(() =>
        useAIGeneration('generateRecipe')
      );

      const generate = hookResult.current[1];
      act(() => {
        generate({
          description: 'I want a recipe for a gluten-free chocolate cake.',
        });
      });

      const [loadingState] = hookResult.current;
      expect(loadingState.isLoading).toBeTruthy();

      await waitFor(() => {
        const [awaitedState] = hookResult.current;
        expect(awaitedState.data).toStrictEqual(expectedResult);
        expect(awaitedState.isLoading).toBeFalsy();
        expect(awaitedState.hasError).toBeTruthy();
        expect(awaitedState.messages).toHaveLength(1);
        expect(awaitedState.messages?.[0].message).toContain('error');
      });
    });
  });
});
