import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { renderHook } from '@testing-library/react-hooks';
import { createDataStorePredicate } from '../../primitives/shared/datastore';
import {
  useDataStoreBinding,
  useDataStoreCollection,
  useDataStoreItem,
} from '../useDataStore';
import { Todo } from '../actions/testShared';

jest.mock('@aws-amplify/datastore');

const fakeModel: any = {
  id: 'FakeModel',
};

const nextFakeModel: any = {
  id: 'nextFakeModel',
};

const fakeItem = {
  fakeField: 'fake-value',
};

const fakeId = 'fake-id';

describe('useDataStoreCollection', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values while data is being fetched', async () => {
    (DataStore.observeQuery as jest.Mock).mockImplementation(() => ({
      subscribe: () => ({
        unsubscribe: jest.fn(),
      }),
    }));

    const { result } = renderHook(() =>
      useDataStoreCollection({
        model: fakeModel,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toHaveLength(0);
    expect(result.current.error).toBeUndefined();
  });

  it('should set error if DataStore.observeQuery throws an error', async () => {
    const fakeError = new Error('Unexpected DataStore error');
    const fakeDataStoreObserveQuery = jest.fn(() => ({
      subscribe: (_, onError) => {
        setTimeout(() => onError(fakeError), 500);
        return { unsubscribe: () => {} };
      },
    }));

    (DataStore.observeQuery as jest.Mock).mockImplementation(
      fakeDataStoreObserveQuery
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreCollection({
        model: fakeModel,
      })
    );

    // Trigger fetch
    await waitForNextUpdate();

    // Check if error is set and loading state is back to normal
    expect(result.current.error).toBe(fakeError);
    expect(result.current.isLoading).toBe(false);

    // Finally, check returned items
    expect(result.current.items).toHaveLength(0);
  });

  it('should return items on success', async () => {
    const fakeItems = Array.from({ length: 100 }).map((_) => fakeItem);

    const namePredicateObject = {
      field: 'name',
      operator: 'eq',
      operand: 'fake-value',
    };
    const predicate: any = createDataStorePredicate<Todo>(namePredicateObject);

    const fakePagination = {
      limit: 100,
      sort: (s) => s.rating(SortDirection.ASCENDING),
    };

    const fakeDataStoreObserveQuery = jest.fn(() => ({
      subscribe: (onSuccess) => {
        setTimeout(() => onSuccess({ items: fakeItems }), 500);
        return { unsubscribe: () => {} };
      },
    }));

    (DataStore.observeQuery as jest.Mock).mockImplementation(
      fakeDataStoreObserveQuery
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreCollection({
        model: fakeModel,
        criteria: predicate,
        pagination: fakePagination,
      })
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.items).toBe(fakeItems);
  });

  it('should unsubscribe on unmount', async () => {
    const unsubscribe = jest.fn();

    const fakeDataStoreObserveQuery = jest.fn(() => ({
      subscribe: () => ({ unsubscribe }),
    }));

    (DataStore.observeQuery as jest.Mock).mockImplementation(
      fakeDataStoreObserveQuery
    );

    const { unmount } = renderHook(() =>
      useDataStoreCollection({
        model: fakeModel,
      })
    );

    // Force component unmount
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should only call DataStore.observeQuery once', () => {
    const unsubscribe = jest.fn();
    const fakeDataStoreObserveQuery = jest.fn(() => ({
      subscribe: () => ({ unsubscribe }),
    }));

    (DataStore.observeQuery as jest.Mock).mockImplementation(
      fakeDataStoreObserveQuery
    );

    const { rerender } = renderHook(
      (params) => useDataStoreCollection(params),
      {
        initialProps: {
          model: fakeModel,
        },
      }
    );

    expect(DataStore.observeQuery).toHaveBeenCalledTimes(1);

    rerender({ model: nextFakeModel });

    expect(DataStore.observeQuery).toHaveBeenCalledTimes(1);
  });
});

describe('useDataStoreItem', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values while data is being fetched', async () => {
    (DataStore.query as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreItem({
        model: fakeModel,
        id: fakeId,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.item).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();
  });

  it('should set error if DataStore.query throws an error', async () => {
    const fakeError = new Error('Unexpected DataStore error');
    const fakeDataStoreQuery = jest.fn(() => Promise.reject(fakeError));

    (DataStore.query as jest.Mock).mockImplementation(fakeDataStoreQuery);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreItem({
        model: fakeModel,
        id: fakeId,
      })
    );

    // Trigger fetch
    await waitForNextUpdate();

    // Check if error is set and loading state is back to normal
    expect(result.current.error).toBe(fakeError);
    expect(result.current.isLoading).toBe(false);

    // Finally, check returned item
    expect(result.current.item).toBeUndefined();
  });

  it('should return item on success', async () => {
    const fakeDataStoreQuery = jest.fn(() => Promise.resolve(fakeItem));
    (DataStore.query as jest.Mock).mockImplementation(fakeDataStoreQuery);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreItem({
        model: fakeModel,
        id: fakeId,
      })
    );

    // Check if DataStore.query was invoked with expected parameters
    expect(fakeDataStoreQuery).toHaveBeenCalledWith(fakeModel, fakeId);

    // Trigger fetch
    await waitForNextUpdate();

    // Check if there's no errors and loading state is back to normal
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);

    // Finally, check returned item
    expect(result.current.item).toBe(fakeItem);
  });

  it('should only call DataStore.query once', async () => {
    const fakeDataStoreQuery = jest.fn(() => Promise.resolve(fakeItem));
    (DataStore.query as jest.Mock).mockImplementation(fakeDataStoreQuery);

    const { rerender, waitForNextUpdate } = renderHook(
      (props) => useDataStoreItem(props),
      {
        initialProps: {
          model: fakeModel,
          id: fakeId,
        },
      }
    );

    // await fetch
    await waitForNextUpdate();

    expect(DataStore.query).toHaveBeenCalledTimes(1);

    rerender({ model: nextFakeModel, id: fakeId });

    expect(DataStore.query).toHaveBeenCalledTimes(1);
  });
});

describe('useDataStoreBinding', () => {
  afterEach(() => jest.clearAllMocks());

  it('handles calls with type record in the happy path', async () => {
    const fakeDataStoreQuery = jest.fn(() => Promise.resolve(fakeItem));
    (DataStore.query as jest.Mock).mockImplementation(fakeDataStoreQuery);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreBinding({
        model: fakeModel,
        id: fakeId,
        type: 'record',
      })
    );

    // Check if DataStore.query was invoked with expected parameters
    expect(fakeDataStoreQuery).toHaveBeenCalledWith(fakeModel, fakeId);

    // Trigger fetch
    await waitForNextUpdate();

    // Check if there's no errors and loading state is back to normal
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);

    // Finally, check returned item
    expect(result.current.item).toBe(fakeItem);
  });

  it('handles calls with type collection in the happy path', async () => {
    const fakeItems = Array.from({ length: 100 }).map((_) => fakeItem);

    const namePredicateObject = {
      field: 'name',
      operator: 'eq',
      operand: 'fake-value',
    };
    const predicate: any = createDataStorePredicate<Todo>(namePredicateObject);

    const fakePagination = {
      limit: 100,
      sort: (s) => s.rating(SortDirection.ASCENDING),
    };

    const fakeDataStoreObserveQuery = jest.fn(() => ({
      subscribe: (onSuccess) => {
        setTimeout(() => onSuccess({ items: fakeItems }), 500);
        return { unsubscribe: () => {} };
      },
    }));

    (DataStore.observeQuery as jest.Mock).mockImplementation(
      fakeDataStoreObserveQuery
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataStoreBinding({
        model: Todo,
        criteria: predicate,
        pagination: fakePagination,
        type: 'collection',
      })
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.items).toBe(fakeItems);
  });
});
