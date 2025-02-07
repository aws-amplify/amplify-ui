import { ListLocations, LocationData } from '../../../actions';
import { listPaths } from '../../../storage-internal';

import { getPaginatedLocations } from '../getPaginatedLocations';
import {
  createAmplifyListLocationsHandler,
  PathAccessWithPermission,
  PathAccessWithPermissions,
  ExtendedListPaths,
  ExtendedListPathsOutput,
} from '../createAmplifyListLocationsHandler';

jest.mock('../../../storage-internal', () => ({
  listPaths: jest.fn(),
}));
jest.mock(
  '../../../adapters/createAmplifyAuthAdapter/getPaginatedLocations',
  () => ({
    getPaginatedLocations: jest.fn(),
  })
);

describe('createAmplifyListLocationsHandler', () => {
  const mockListPaths = jest.mocked(listPaths as ExtendedListPaths);
  const mockGetPaginatedItems = jest.mocked(getPaginatedLocations);
  const mockId = 'intentionally-static-test-id';

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => mockId },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch locations when the cache is empty', async () => {
    const handler = createAmplifyListLocationsHandler();
    const fetchedLocations: ExtendedListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/*',
        type: 'PREFIX',
      },
    ];
    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const input = { options: { pageSize: 10, nextToken: undefined } };
    const paginatedResult = {
      items: sanitizedLocations,
      nextToken: undefined,
    };

    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockListPaths).toHaveBeenCalledTimes(1);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
  });

  it('should fetch locations from the cache', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();
    const input = { options: { pageSize: 10, nextToken: undefined } };

    const fetchedLocations: ExtendedListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/*',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    await handler(input);

    const cachedItems: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = {
      items: cachedItems,
      nextToken: undefined,
    };

    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: cachedItems,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });

  it('should handle pagination', async () => {
    const handler = createAmplifyListLocationsHandler();
    const fetchedLocations: ExtendedListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/*',
        type: 'PREFIX',
      },
      {
        bucket: 'bucket2',
        permission: ['read'],
        prefix: 'prefix2/*',
        type: 'PREFIX',
      },
    ];

    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
      {
        prefix: 'prefix2/',
        bucket: 'bucket2',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const input = { options: { pageSize: 1, nextToken: undefined } };
    const paginatedResult = {
      items: [{ ...sanitizedLocations }[0]],
      nextToken: 'token1',
    };

    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result.items).toEqual(paginatedResult.items);
    expect(mockListPaths).toHaveBeenCalledTimes(1);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
  });

  it('behaves as expected when no input is provided', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();

    const fetchedLocations: ExtendedListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/*',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });

    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = { items: sanitizedLocations, nextToken: undefined };

    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);
    // @ts-expect-error intentionally call `handler` without `input` to test robustness
    const result = await handler();

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: undefined,
      nextToken: undefined,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });

  it('handles a returned prefix that does not end with "*" as expected', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();
    const input = { options: { pageSize: 10, nextToken: undefined } };

    const fetchedLocations: ExtendedListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });

    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = { items: sanitizedLocations, nextToken: undefined };
    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });

  it('handles a location returned from `listPaths` that includes a "permission" key as expected', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();
    const input = { options: { pageSize: 10, nextToken: undefined } };

    const fetchedLocations: PathAccessWithPermission[] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1/',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });

    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = {
      items: sanitizedLocations,
      nextToken: undefined,
    };
    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });

  it('handles a location returned from `listPaths` that includes a "permissions" key as expected', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();
    const input = { options: { pageSize: 10, nextToken: undefined } };

    const fetchedLocations: PathAccessWithPermissions[] = [
      {
        bucket: 'bucket1',
        permissions: ['read'],
        prefix: 'prefix1/',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });

    const sanitizedLocations: LocationData[] = [
      {
        prefix: 'prefix1/',
        bucket: 'bucket1',
        id: mockId,
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = {
      items: sanitizedLocations,
      nextToken: undefined,
    };
    mockGetPaginatedItems.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedItems).toHaveBeenCalledWith({
      items: sanitizedLocations,
      pageSize: input.options.pageSize,
      nextToken: input.options.nextToken,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });
});
