import { createAmplifyListLocationsHandler } from '../createAmplifyListLocationsHandler';
import { getPaginatedLocations } from '../getPaginatedLocations';
import { listPaths, ListPathsOutput } from '../../../storage-internal';
import { LocationAccess, ListLocations } from '../../types';

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
  const mockListPaths = jest.mocked(listPaths);
  const mockGetPaginatedLocations = jest.mocked(getPaginatedLocations);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch locations when the cache is empty', async () => {
    const handler = createAmplifyListLocationsHandler();
    const fetchedLocations: ListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1',
        type: 'PREFIX',
      },
    ];
    const sanitizedLocation: LocationAccess[] = [
      {
        scope: 's3://bucket1/prefix1',
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const input = { pageSize: 10, nextToken: undefined };
    const paginatedResult = {
      locations: sanitizedLocation,
      nextToken: undefined,
    };

    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    mockGetPaginatedLocations.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockListPaths).toHaveBeenCalledTimes(1);
    expect(mockGetPaginatedLocations).toHaveBeenCalledWith({
      locations: sanitizedLocation,
      pageSize: input.pageSize,
      nextToken: input.nextToken,
    });
  });

  it('should fetch locations from the cache', async () => {
    const handler: ListLocations = createAmplifyListLocationsHandler();
    const input = { pageSize: 10, nextToken: undefined };

    const fetchedLocations: ListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1',
        type: 'PREFIX',
      },
    ];
    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    await handler(input);

    const cachedLocations: LocationAccess[] = [
      {
        scope: 's3://bucket1/prefix1',
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const paginatedResult = {
      locations: cachedLocations,
      nextToken: undefined,
    };

    mockGetPaginatedLocations.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result).toEqual(paginatedResult);
    expect(mockGetPaginatedLocations).toHaveBeenCalledWith({
      locations: cachedLocations,
      pageSize: input.pageSize,
      nextToken: input.nextToken,
    });
    expect(mockListPaths).toHaveBeenCalledTimes(1);
  });

  it('should handle pagination', async () => {
    const handler = createAmplifyListLocationsHandler();
    const fetchedLocations: ListPathsOutput['locations'] = [
      {
        bucket: 'bucket1',
        permission: ['read'],
        prefix: 'prefix1',
        type: 'PREFIX',
      },
      {
        bucket: 'bucket2',
        permission: ['read'],
        prefix: 'prefix2',
        type: 'PREFIX',
      },
    ];

    const sanitizedLocation: LocationAccess[] = [
      {
        scope: 's3://bucket1/prefix1',
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
      {
        scope: 's3://bucket2/prefix2',
        permissions: ['get', 'list'],
        type: 'PREFIX',
      },
    ];

    const input = { pageSize: 1, nextToken: undefined };
    const paginatedResult = {
      locations: [sanitizedLocation[0]],
      nextToken: 'token1',
    };

    mockListPaths.mockResolvedValueOnce({ locations: fetchedLocations });
    mockGetPaginatedLocations.mockReturnValueOnce(paginatedResult);

    const result = await handler(input);

    expect(result.locations).toEqual(paginatedResult.locations);
    expect(mockListPaths).toHaveBeenCalledTimes(1);
    expect(mockGetPaginatedLocations).toHaveBeenCalledWith({
      locations: sanitizedLocation,
      pageSize: input.pageSize,
      nextToken: input.nextToken,
    });
  });
});
