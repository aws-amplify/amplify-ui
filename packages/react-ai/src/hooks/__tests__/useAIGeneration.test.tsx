import { renderHook, act } from '@testing-library/react-hooks';
import { createUseAIGeneration } from '../useAIGeneration';
import { INITIAL_STATE, LOADING_STATE, ERROR_STATE } from '../shared';

describe('useAIGeneration', () => {
  const mockClient = {
    generations: {
      testRoute: jest.fn(),
    },
    conversations: {},
  };

  const useAIGeneration = createUseAIGeneration(mockClient);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAIGeneration('testRoute'));

    expect(result.current[0]).toEqual({
      ...INITIAL_STATE,
      data: undefined,
    });
  });

  it('should handle successful generation', async () => {
    const mockData = { text: 'generated content' };
    mockClient.generations.testRoute.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useAIGeneration('testRoute')
    );

    act(() => {
      result.current[1]({ prompt: 'test prompt' });
    });

    await waitForNextUpdate();

    expect(mockClient.generations.testRoute).toHaveBeenCalledWith({
      prompt: 'test prompt',
    });
    expect(result.current[0]).toEqual({
      ...INITIAL_STATE,
      data: mockData,
    });
  });

  it('should handle loading state', () => {
    const mockData = { text: 'generated content' };
    mockClient.generations.testRoute.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockData }), 1000)
        )
    );

    const { result } = renderHook(() => useAIGeneration('testRoute'));

    act(() => {
      result.current[1]({ prompt: 'test prompt' });
    });

    expect(result.current[0]).toEqual({
      ...LOADING_STATE,
      data: undefined,
    });
  });

  it('should handle error state', async () => {
    const errors = ['Error message'];
    mockClient.generations.testRoute.mockResolvedValueOnce({
      data: undefined,
      errors,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useAIGeneration('testRoute')
    );

    act(() => {
      result.current[1]({ prompt: 'test prompt' });
    });

    await waitForNextUpdate();

    expect(mockClient.generations.testRoute).toHaveBeenCalledWith({
      prompt: 'test prompt',
    });

    expect(result.current[0]).toEqual({
      ...ERROR_STATE,
      data: undefined,
      messages: errors,
    });
  });

  it('should preserve previous data while loading', async () => {
    const initialData = { text: 'initial content' };
    const newData = { text: 'new content' };

    mockClient.generations.testRoute.mockResolvedValueOnce({
      data: initialData,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useAIGeneration('testRoute')
    );

    act(() => {
      result.current[1]({ prompt: 'first prompt' });
    });

    await waitForNextUpdate();

    mockClient.generations.testRoute.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: newData }), 100)
        )
    );

    act(() => {
      result.current[1]({ prompt: 'second prompt' });
    });

    expect(result.current[0]).toEqual({
      ...LOADING_STATE,
      data: initialData,
    });
  });
});
