import {
  createEnhancedListHandler,
  SEARCH_LIMIT,
} from '../createEnhancedListHandler';
import {
  ActionInputConfig,
  ListHandler,
  ListHandlerInput,
  ListHandlerOutput,
} from '../handlers';

const mockAction = jest.fn();

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-west-1',
};
type Output = ListHandlerOutput<{
  name: string;
  id: number;
}>;

type Handler = ListHandler<ListHandlerInput, Output>;

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
      search: { query: 'a', filterKey: 'name' as const },
    };

    const result = await handler(prevState, {
      config,
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
      search: { query: 'a', filterKey: 'name' as const },
    };

    const result = await handler(prevState, {
      config,
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
    expect(result.search?.hasExhaustedSearch).toBeFalsy();
  });

  it('should collect and filter results when search and duplicate prefix is provided', async () => {
    mockAction.mockResolvedValueOnce({
      items: [{ name: 'foo/bar/cherry' }, { name: 'foo/date/foo' }],
      nextToken: null,
    });

    const handler = createEnhancedListHandler(mockAction as Handler);
    const prevState = { items: [], nextToken: undefined };
    const options = {
      search: { query: 'foo', filterKey: 'name' as const },
    };

    const result = await handler(prevState, {
      config,
      prefix: 'foo/',
      options,
    });

    expect(result.items).toEqual([{ name: 'foo/date/foo' }]);
    expect(result.nextToken).toBeUndefined();
  });

  it('should not fail when non-string values are indexed for search', async () => {
    mockAction.mockResolvedValueOnce({
      items: [
        { name: 'a_prefix/apple', id: 1 },
        { name: 'a_prefix/banana', id: 2 },
      ],
      nextToken: null,
    });

    const handler = createEnhancedListHandler(mockAction as Handler);
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
    expect(result.search?.hasExhaustedSearch).toBeTruthy();

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
