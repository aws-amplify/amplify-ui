import {
  createEnhancedListHandler,
  SEARCH_LIMIT,
} from '../createEnhancedListHandler';
import { ActionInputConfig, ListHandlerOptions } from '../types';

const mockAction = jest.fn();

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};

describe('createEnhancedListHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty state when reset is true', async () => {
    const handler = createEnhancedListHandler(mockAction);
    const prevState = { items: [{ id: 1 }], nextToken: 'abc' };
    const options = { reset: true };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(result).toEqual({ items: [], nextToken: undefined });
  });

  it('should collect and filter results when search is provided', async () => {
    mockAction
      .mockResolvedValueOnce({
        items: [{ name: 'apple' }, { name: 'banana' }],
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        items: [{ name: 'cherry' }, { name: 'date' }],
        nextToken: null,
      });

    const handler = createEnhancedListHandler<
      ListHandlerOptions,
      {
        name: string;
      }
    >(mockAction);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'a', filterKey: 'name' as const },
    };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(result.items).toEqual([
      { name: 'apple' },
      { name: 'banana' },
      { name: 'date' },
    ]);
    expect(result.nextToken).toBeUndefined();
  });

  it('should not fail when non-string values are indexed for search', async () => {
    mockAction.mockResolvedValueOnce({
      items: [
        { name: 'apple', id: 1 },
        { name: 'banana', id: 2 },
      ],
      nextToken: null,
    });

    const handler = createEnhancedListHandler<
      ListHandlerOptions,
      {
        name: string;
        id: number;
      }
    >(mockAction);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'z', filterKey: 'id' as const },
    };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(result.items).toEqual([]);
    expect(result.nextToken).toBeUndefined();
  });

  it('should stop collecting results when SEARCH_LIMIT is reached', async () => {
    const mockItems = new Array(SEARCH_LIMIT).fill({ name: 'item' });
    mockAction
      .mockResolvedValueOnce({
        items: mockItems.slice(0, SEARCH_LIMIT / 2),
        nextToken: 'token',
      })
      .mockResolvedValueOnce({
        items: mockItems.slice(SEARCH_LIMIT / 2),
        nextToken: 'token2',
      })
      .mockResolvedValueOnce({ items: mockItems, nextToken: 'token3' });

    const handler = createEnhancedListHandler<
      ListHandlerOptions,
      {
        name: string;
      }
    >(mockAction);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'item', filterKey: 'name' as const },
    };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(mockAction).toHaveBeenCalledTimes(2);
    expect(result.items.length).toBe(SEARCH_LIMIT);
    expect(result.nextToken).toBeUndefined();

    mockAction.mockReset();
  });

  it('should ignore provided nextToken on refresh', async () => {
    mockAction.mockResolvedValue({
      items: [{ id: 1 }, { id: 2 }],
      nextToken: 'next',
    });

    const handler = createEnhancedListHandler(mockAction);
    const prevState = { items: [{ id: 0 }], nextToken: 'abc' };
    const options = { refresh: true, nextToken: 'token' };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(mockAction).toHaveBeenCalledWith({
      config,
      prefix: 'a_prefix',
      options: { nextToken: undefined },
    });

    expect(result.items).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.nextToken).toBe('next');
  });

  it('should append items when refresh is false', async () => {
    mockAction.mockResolvedValue({
      items: [{ id: 2 }, { id: 3 }],
      nextToken: 'next',
    });

    const handler = createEnhancedListHandler(mockAction);
    const prevState = { items: [{ id: 1 }], nextToken: 'abc' };
    const options = { refresh: false };

    const result = await handler(prevState, {
      config,
      prefix: 'a_prefix',
      options,
    });

    expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(result.nextToken).toBe('next');
  });
});
