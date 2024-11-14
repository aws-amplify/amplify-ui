import {
  createListLocationsAction,
  parseAccessGrantLocation,
} from '../listLocationsAction';
import { ListLocations, LocationAccess } from '../../../adapters/types';
import { generateCombinations } from '../../../actions/__tests__/__testUtils__/permissions';
import { LocationPermissions } from '../../../actions';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'identifier!',
  },
});

const fakeLocation: LocationAccess = {
  scope: 's3://some-bucket/*',
  permissions: ['list'],
  type: 'BUCKET',
};

const getFakeLocation = (
  permissions: LocationAccess['permissions'] = ['list'],
  type: LocationAccess['type'] = 'BUCKET'
) => {
  if (type === 'PREFIX') {
    return {
      ...fakeLocation,
      scope: 's3://some-bucket/prefix1/*',
      permissions,
      type,
    };
  } else if (type === 'OBJECT') {
    return {
      ...fakeLocation,
      scope: 's3://some-bucket/my.pdf',
      permissions,
      type,
    };
  }

  return { ...fakeLocation, permissions, type };
};

const generateMockLocations = (size: number) =>
  Array<LocationAccess>(size).fill(fakeLocation);

const listLocations: ListLocations = ({ pageSize } = {}) => {
  return Promise.resolve({
    locations: generateMockLocations(pageSize!),
    nextToken: undefined,
  });
};

const mockListLocations = jest.fn(listLocations);

describe('createListLocationsAction', () => {
  beforeEach(() => {
    mockListLocations.mockClear();
  });
  it('returns the expected output shape in the happy path', async () => {
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(100),
      nextToken: 'next',
    });
    const listLocationsAction = createListLocationsAction(mockListLocations);

    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 100 } }
    );

    expect(output.result).toHaveLength(100);
    expect(output.nextToken).toBe('next');
  });

  it('merges the current action result with the previous action result', async () => {
    mockListLocations
      .mockResolvedValueOnce({
        locations: generateMockLocations(100),
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        locations: generateMockLocations(100),
        nextToken: 'next-oooo',
      });

    const listLocationsAction = createListLocationsAction(mockListLocations);
    const { result, nextToken } = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 100 } }
    );

    expect(result).toHaveLength(100);
    expect(nextToken).toBe('next');

    const { result: nextResult, nextToken: nextNextToken } =
      await listLocationsAction(
        { result, nextToken },
        { options: { pageSize: 100 } }
      );

    expect(nextResult).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextNextToken).toBe('next-oooo');
  });

  it('should paginate with default page limit and provide next token', async () => {
    // assume, total items: 1500; default page limit: 1000
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(600),
      nextToken: 'next-1',
    });
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(200),
      nextToken: 'next-2',
    });
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(200),
      nextToken: 'next-3',
    });

    const listLocationsAction = createListLocationsAction(mockListLocations);

    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      {}
    );

    expect(mockListLocations).toHaveBeenCalledTimes(3);
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 1000,
      nextToken: undefined,
    });
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 400,
      nextToken: 'next-1',
    });
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 200,
      nextToken: 'next-2',
    });

    expect(output.result).toHaveLength(1000);
    expect(output.nextToken).toBe('next-3');
  });

  it('should paginate with input page limit and conclude', async () => {
    // assume, total items: 70; requested page limit: 100
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(50),
      nextToken: 'next',
    });
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(20),
      nextToken: undefined,
    });

    const listLocationsAction = createListLocationsAction(mockListLocations);

    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 100 } }
    );

    expect(mockListLocations).toHaveBeenCalledTimes(2);
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 100,
      nextToken: undefined,
    });
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 50,
      nextToken: 'next',
    });

    expect(output.result).toHaveLength(70);
    expect(output.nextToken).toBeUndefined();
  });

  it('should filter out all WRITE permission grants and invalid prefix grants (prefix*)', async () => {
    const invalidPrefixLocation: LocationAccess = {
      permissions: ['list', 'write'],
      scope: 's3://some-bucket/invalid-prefix*',
      type: 'PREFIX',
    };
    // Expect 9 total combinations and 0 will be filtered out.
    // 3 different combinations of ['get', 'list'] permissions * 3 different location types.
    const fakeReadLocations = generateCombinations([
      'get',
      'list',
    ] as LocationPermissions)
      .map((permissions) => [
        getFakeLocation(permissions, 'OBJECT'),
        getFakeLocation(permissions, 'BUCKET'),
        getFakeLocation(permissions, 'PREFIX'),
      ])
      .flat();
    // Expect 9 total combinations and 9 will be filtered out.
    // 3 different combinations of ['write', 'delete'] permissions * 3 different location types.
    const fakeWriteLocations = generateCombinations([
      'write',
      'delete',
    ] as LocationPermissions)
      .map((permissions) => [
        getFakeLocation(permissions, 'OBJECT'),
        getFakeLocation(permissions, 'BUCKET'),
        getFakeLocation(permissions, 'PREFIX'),
      ])
      .flat();
    // expect 27 total combinations and 0 will be filtered out.
    // 3 different combinations of ['get', 'list'] permissions * 3 different combinations of
    // ['write', 'delete'] permissions * 3 different location types.
    const fakeReadWriteLocations: LocationAccess[] = [];
    for (const fakeReadLocation of fakeReadLocations) {
      for (const fakeWriteLocation of fakeWriteLocations) {
        if (fakeWriteLocation.type === fakeReadLocation.type) {
          fakeReadWriteLocations.push({
            permissions: [
              ...fakeReadLocation.permissions,
              ...fakeWriteLocation.permissions,
            ],
            type: fakeReadLocation.type,
            scope: fakeWriteLocation.scope,
          });
        }
      }
    }

    mockListLocations.mockResolvedValueOnce({
      locations: [...fakeWriteLocations, ...fakeReadLocations],
      nextToken: 'next',
    });
    mockListLocations.mockResolvedValueOnce({
      locations: [invalidPrefixLocation, ...fakeReadWriteLocations],
      nextToken: undefined,
    });

    const listLocationsAction = createListLocationsAction(mockListLocations);
    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 36, exclude: 'WRITE' } }
    );

    expect(mockListLocations).toHaveBeenCalledTimes(2);
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 36,
      nextToken: undefined,
    });
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 27,
      nextToken: 'next',
    });

    expect(output.result).toStrictEqual(
      [...fakeReadLocations, ...fakeReadWriteLocations].map(
        parseAccessGrantLocation
      )
    );
    expect(output.nextToken).toBeUndefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
});
