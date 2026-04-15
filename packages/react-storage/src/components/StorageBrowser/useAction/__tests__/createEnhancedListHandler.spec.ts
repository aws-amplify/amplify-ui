import {
  createEnhancedListHandler,
  SEARCH_LIMIT,
} from '../createEnhancedListHandler';
import {
  ListHandler,
  ListHandlerInput,
  ListHandlerOutput,
} from '../../actions';

const mockAction = jest.fn();

type Output = ListHandlerOutput<{
  name: string;
  alt: string;
  id: number;
}>;

type Handler = ListHandler<ListHandlerInput, Output>;

describe('createEnhancedListHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return an empty state when reset is true', async () => {
    const handler = createEnhancedListHandler(mockAction);
    const prevState = { items: [{ id: 1 }], nextToken: 'abc' };
    const options = { reset: true };

    const result = await handler(prevState, {
      prefix: 'a_prefix',
      options,
    });

    expect(result).toEqual({ items: [], nextToken: undefined });
  });

  it('should collect and filter results when search and prefix is provided', async () => {
    mockAction
      .mockResolvedValueOnce({
        items: [{ name: 'a_prefix/apple' }, { name: 'a_prefix/banana' }],
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        items: [{ name: 'a_prefix/cherry' }, { name: 'a_prefix/date' }],
        nextToken: null,
      });

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'a', filterBy: 'name' as const },
    };

    const result = await handler(prevState, {
      prefix: 'a_prefix',
      options,
    });

    expect(result.items).toEqual([
      { name: 'a_prefix/apple' },
      { name: 'a_prefix/banana' },
      { name: 'a_prefix/date' },
    ]);
    expect(result.nextToken).toBeUndefined();
  });

  it('should collect and filter results when search and empty prefix is provided', async () => {
    mockAction
      .mockResolvedValueOnce({
        items: [{ name: 'foo/bar/apple' }, { name: 'banana' }],
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        items: [{ name: 'foo/bar/cherry' }, { name: 'date' }],
        nextToken: null,
      });

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'a', filterBy: 'name' as const },
    };

    const result = await handler(prevState, {
      prefix: '',
      options,
    });

    expect(result.items).toEqual([
      { name: 'foo/bar/apple' },
      { name: 'banana' },
      { name: 'foo/bar/cherry' },
      { name: 'date' },
    ]);
    expect(result.nextToken).toBeUndefined();
    expect(result.hasExhaustedSearch).toBeFalsy();
  });

  it('should collect and filter results using a filter key function', async () => {
    mockAction
      .mockResolvedValueOnce({
        items: [
          { name: 'foo/bar/apple', alt: 'cosmic-crisp' },
          { name: 'banana', alt: '' },
        ],
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        items: [
          { name: 'melon', alt: 'aka-melon' },
          { name: 'foo/bar/cherry', alt: '' },
          { name: 'date', alt: '' },
        ],
        nextToken: null,
      });

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };

    const result = await handler(prevState, {
      prefix: '',
      options: {
        search: {
          query: 'a',
          filterBy: (item: Record<'alt' | 'name', any>) => {
            return item.alt ? 'alt' : 'name';
          },
        },
      },
    });

    expect(result.items).toEqual([
      expect.objectContaining({ name: 'banana' }),
      expect.objectContaining({ name: 'melon', alt: 'aka-melon' }),
      expect.objectContaining({ name: 'foo/bar/cherry' }),
      expect.objectContaining({ name: 'date' }),
    ]);

    expect(result.nextToken).toBeUndefined();
    expect(result.hasExhaustedSearch).toBeFalsy();
  });

  it('should collect and filter results when search and duplicate prefix is provided', async () => {
    mockAction.mockResolvedValueOnce({
      items: [{ name: 'foo/bar/cherry' }, { name: 'foo/date/foo' }],
      nextToken: null,
    });

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'foo', filterBy: 'name' as const },
    };

    const result = await handler(prevState, {
      prefix: 'foo/',
      options,
    });

    expect(result.items).toEqual([{ name: 'foo/date/foo' }]);
    expect(result.nextToken).toBeUndefined();
  });

  it('should stop collecting results when SEARCH_LIMIT is reached', async () => {
    const mockItems = new Array(SEARCH_LIMIT).fill({ name: 'a_prefix/item' });
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

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'item', filterBy: 'name' as const },
    };

    const result = await handler(prevState, {
      prefix: 'a_prefix',
      options,
    });

    expect(mockAction).toHaveBeenCalledTimes(2);
    expect(result.items.length).toBe(SEARCH_LIMIT);
    expect(result.nextToken).toBeUndefined();
    expect(result.hasExhaustedSearch).toBe(true);
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
      prefix: 'a_prefix',
      options,
    });

    expect(mockAction).toHaveBeenCalledWith({
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
      prefix: 'a_prefix',
      options,
    });

    expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(result.nextToken).toBe('next');
  });

  describe('search result caching', () => {
    it('should reuse cached items on subsequent search with same prefix', async () => {
      mockAction.mockResolvedValueOnce({
        items: [
          { name: 'a_prefix/apple' },
          { name: 'a_prefix/banana' },
          { name: 'a_prefix/avocado' },
        ],
        nextToken: null,
      });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      const result1 = await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'pl', filterBy: 'name' as const } },
      });

      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(result1.items).toEqual([{ name: 'a_prefix/apple' }]);

      const result2 = await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'ban', filterBy: 'name' as const } },
      });

      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(result2.items).toEqual([{ name: 'a_prefix/banana' }]);
    });

    it('should invalidate cache when refresh is true', async () => {
      mockAction
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }],
          nextToken: null,
        })
        .mockResolvedValueOnce({
          items: [{ id: 1 }, { id: 2 }],
          nextToken: 'next',
        })
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }, { name: 'a_prefix/banana' }],
          nextToken: null,
        });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });
      expect(mockAction).toHaveBeenCalledTimes(1);

      await handler(prevState, {
        prefix: 'a_prefix',
        options: { refresh: true },
      });

      const result = await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });

      expect(mockAction).toHaveBeenCalledTimes(3);
      expect(result.items).toEqual([
        { name: 'a_prefix/apple' },
        { name: 'a_prefix/banana' },
      ]);
    });

    it('should invalidate cache when reset is true', async () => {
      mockAction
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }],
          nextToken: null,
        })
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }, { name: 'a_prefix/avocado' }],
          nextToken: null,
        });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });
      expect(mockAction).toHaveBeenCalledTimes(1);

      await handler(prevState, {
        prefix: 'a_prefix',
        options: { reset: true },
      });

      const result = await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });

      expect(mockAction).toHaveBeenCalledTimes(2);
      expect(result.items).toEqual([
        { name: 'a_prefix/apple' },
        { name: 'a_prefix/avocado' },
      ]);
    });

    it('should invalidate cache when prefix changes', async () => {
      mockAction
        .mockResolvedValueOnce({
          items: [{ name: 'a/apple' }],
          nextToken: null,
        })
        .mockResolvedValueOnce({
          items: [{ name: 'b/banana' }],
          nextToken: null,
        });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      await handler(prevState, {
        prefix: 'a/',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });
      expect(mockAction).toHaveBeenCalledTimes(1);

      const result = await handler(prevState, {
        prefix: 'b/',
        options: { search: { query: 'ban', filterBy: 'name' as const } },
      });

      expect(mockAction).toHaveBeenCalledTimes(2);
      expect(result.items).toEqual([{ name: 'b/banana' }]);
    });

    it('should invalidate cache when refresh is passed in search options', async () => {
      mockAction
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }],
          nextToken: null,
        })
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/apple' }, { name: 'a_prefix/avocado' }],
          nextToken: null,
        });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      await handler(prevState, {
        prefix: 'a_prefix',
        options: { search: { query: 'a', filterBy: 'name' as const } },
      });
      expect(mockAction).toHaveBeenCalledTimes(1);

      const result = await handler(prevState, {
        prefix: 'a_prefix',
        options: {
          refresh: true,
          search: { query: 'a', filterBy: 'name' as const },
        },
      });

      expect(mockAction).toHaveBeenCalledTimes(2);
      expect(result.items).toEqual([
        { name: 'a_prefix/apple' },
        { name: 'a_prefix/avocado' },
      ]);
    });
  });

  describe('configurable search limit', () => {
    it('should respect custom search limit', async () => {
      const batchSize = 300;
      const customLimit = 500;
      const batch = Array.from({ length: batchSize }, (_, i) => ({
        name: `a_prefix/item${i}`,
      }));

      mockAction
        .mockResolvedValueOnce({ items: batch, nextToken: 'token1' })
        .mockResolvedValueOnce({ items: batch, nextToken: 'token2' })
        .mockResolvedValueOnce({ items: batch, nextToken: 'token3' });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      const result = await handler(prevState, {
        prefix: 'a_prefix',
        options: {
          search: {
            query: 'item',
            filterBy: 'name' as const,
            limit: customLimit,
          },
        },
      });

      expect(mockAction).toHaveBeenCalledTimes(2);
      expect(result.items.length).toBeLessThanOrEqual(batchSize * 2);
      expect(result.hasExhaustedSearch).toBe(true);
    });
  });

  describe('progress callback', () => {
    it('should call onProgress after each batch', async () => {
      mockAction
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/a1' }, { name: 'a_prefix/a2' }],
          nextToken: 'token1',
        })
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/a3' }],
          nextToken: 'token2',
        })
        .mockResolvedValueOnce({
          items: [{ name: 'a_prefix/a4' }],
          nextToken: null,
        });

      const onProgress = jest.fn();
      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      await handler(prevState, {
        prefix: 'a_prefix',
        options: {
          search: {
            query: 'a',
            filterBy: 'name' as const,
            onProgress,
          },
        },
      });

      expect(onProgress).toHaveBeenCalledTimes(3);
      expect(onProgress).toHaveBeenNthCalledWith(1, { fetchedCount: 2 });
      expect(onProgress).toHaveBeenNthCalledWith(2, { fetchedCount: 3 });
      expect(onProgress).toHaveBeenNthCalledWith(3, { fetchedCount: 4 });
    });

    it('should not fail if onProgress is not provided', async () => {
      mockAction.mockResolvedValueOnce({
        items: [{ name: 'a_prefix/apple' }],
        nextToken: null,
      });

      const handler = createEnhancedListHandler(mockAction as Handler);
      const prevState = { items: [], nextToken: undefined };

      const result = await handler(prevState, {
        prefix: 'a_prefix',
        options: {
          search: { query: 'a', filterBy: 'name' as const },
        },
      });

      expect(result.items).toEqual([{ name: 'a_prefix/apple' }]);
    });
  });
});
