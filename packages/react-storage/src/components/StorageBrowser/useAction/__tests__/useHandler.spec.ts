import { renderHook } from '@testing-library/react';

import { useGetActionInput } from '../../configuration';
import { useProcessTasks } from '../../tasks';

import { useHandler } from '../useHandler';
import { DEFAULT_ACTION_CONCURRENCY } from '../constants';

jest.mock('../../configuration');
jest.mock('../../tasks');

const useProcessTasksMock = jest.mocked(useProcessTasks);

const config = {
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials: jest.fn(),
  region: 'us-west-2',
};
const getConfig = jest.fn(() => config);

const useGetActionInputMock = jest
  .mocked(useGetActionInput)
  .mockReturnValue(getConfig);

const handler = jest.fn();

const reset = jest.fn();
const mockAtomicState = {
  reset,
  isProcessing: false,
  isProcessingComplete: false,
  statusCounts: {},
  task: undefined,
};

const taskOne = {};
const taskTwo = {};
const mockBatchState = {
  isProcessing: false,
  isProcessingComplete: false,
  reset,
  statusCounts: {},
  tasks: [taskOne, taskTwo],
};

const mockUseProcessDispatch = jest.fn();

describe('useHandler', () => {
  beforeEach(jest.clearAllMocks);

  it('returns the expected state when called without `options`', () => {
    useProcessTasksMock.mockReturnValueOnce([
      mockAtomicState,
      mockUseProcessDispatch,
    ]);

    const { result } = renderHook(() => useHandler(handler));

    expect(result.current).toHaveLength(2);

    const [state] = result.current;

    expect(state).toStrictEqual({
      isProcessing: mockAtomicState.isProcessing,
      task: mockAtomicState.task,
    });
  });

  it('returns the expected dispatch handler when called without `options`', () => {
    useProcessTasksMock.mockReturnValueOnce([
      mockAtomicState,
      mockUseProcessDispatch,
    ]);

    const { result } = renderHook(() => useHandler(handler));

    expect(result.current).toHaveLength(2);

    const [, dispatch] = result.current;

    expect(dispatch).toStrictEqual(expect.any(Function));

    const data = { key: 'key', id: 'id' };
    dispatch({ data });

    expect(mockUseProcessDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseProcessDispatch).toHaveBeenCalledWith({ config, data });
  });

  it('returns the expected values when called with `options` that include `items`', () => {
    useProcessTasksMock.mockReturnValueOnce([
      mockBatchState,
      mockUseProcessDispatch,
    ]);

    const { result } = renderHook(() => useHandler(handler, { items: [] }));

    expect(result.current).toHaveLength(2);

    const [state] = result.current;

    expect(state).toStrictEqual(mockBatchState);
  });

  it('returns the expected dispatch handler when called with `options` that include `items`', () => {
    useProcessTasksMock.mockReturnValueOnce([
      mockBatchState,
      mockUseProcessDispatch,
    ]);

    const { result } = renderHook(() => useHandler(handler, { items: [] }));

    expect(result.current).toHaveLength(2);

    const [, dispatch] = result.current;

    expect(dispatch).toStrictEqual(expect.any(Function));

    dispatch();

    expect(mockUseProcessDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseProcessDispatch).toHaveBeenCalledWith({
      config,
      options: { concurrency: DEFAULT_ACTION_CONCURRENCY },
    });
  });

  it('provides the expected values to `useProcessTasks` when called with `options` that include `items`', () => {
    useProcessTasksMock.mockReturnValueOnce([
      mockBatchState,
      mockUseProcessDispatch,
    ]);

    const input = {
      items: [],
      onTaskError: jest.fn(),
      onTaskProgress: jest.fn(),
      onTaskSuccess: jest.fn(),
    };

    renderHook(() => useHandler(handler, input));

    expect(useGetActionInputMock).toHaveBeenCalledTimes(1);
    expect(useGetActionInputMock).toHaveBeenCalledWith();

    expect(useProcessTasksMock).toHaveBeenCalledTimes(1);
    expect(useProcessTasksMock).toHaveBeenCalledWith(handler, {
      items: input.items,
      onTaskError: input.onTaskError,
      onTaskProgress: input.onTaskProgress,
      onTaskSuccess: input.onTaskSuccess,
    });
  });
});
