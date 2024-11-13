import { ListLocations, LocationAccess } from '../../../storage-internal';

import { createListLocationsAction } from '../listLocationsAction';
import { parseLocationAccess } from '../../../actions/handlers/utils';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'identifier!',
  },
});

const fakeLocation: LocationAccess = {
  scope: 's3://some-bucket/*',
  permission: 'READ',
  type: 'BUCKET',
};

const getFakeLocation = (
  permission: LocationAccess['permission'] = 'READWRITE',
  type: LocationAccess['type'] = 'BUCKET'
) => {
  if (type === 'PREFIX') {
    return {
      ...fakeLocation,
      scope: 's3://some-bucket/prefix1/*',
      permission,
      type,
    };
  } else if (type === 'OBJECT') {
    return {
      ...fakeLocation,
      scope: 's3://some-bucket/my.pdf',
      permission,
      type,
    };
  }

  return { ...fakeLocation, permission, type };
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

  it(`should filter out WRITE permission, invalid prefixes (prefix*) and 'OBJECT' type with WRITE access`, async () => {
    const invalidPrefixLocation: LocationAccess = {
      permission: 'READWRITE',
      scope: 's3://some-bucket/invalid-prefix*',
      type: 'PREFIX',
    };
    const fakeReadLocations = [
      getFakeLocation('READ', 'BUCKET'),
      getFakeLocation('READ', 'OBJECT'),
      getFakeLocation('READ', 'PREFIX'),
    ];
    const fakeWriteLocations = [
      getFakeLocation('WRITE', 'BUCKET'),
      getFakeLocation('WRITE', 'OBJECT'),
      getFakeLocation('WRITE', 'PREFIX'),
    ];
    const fakeReadWriteLocations = [
      invalidPrefixLocation,
      getFakeLocation('READWRITE', 'BUCKET'),
      getFakeLocation('READWRITE', 'OBJECT'),
      getFakeLocation('READWRITE', 'PREFIX'),
    ];

    mockListLocations.mockResolvedValueOnce({
      locations: [...fakeReadLocations, ...fakeWriteLocations],
      nextToken: 'next',
    });
    mockListLocations.mockResolvedValueOnce({
      locations: [...fakeReadWriteLocations],
      nextToken: undefined,
    });

    const listLocationsAction = createListLocationsAction(mockListLocations);
    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 10, exclude: 'WRITE' } }
    );

    expect(mockListLocations).toHaveBeenCalledTimes(2);
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 10,
      nextToken: undefined,
    });
    expect(mockListLocations).toHaveBeenCalledWith({
      pageSize: 7,
      nextToken: 'next',
    });

    expect(output.result).toStrictEqual(
      [
        getFakeLocation('READ', 'BUCKET'),
        getFakeLocation('READ', 'OBJECT'),
        getFakeLocation('READ', 'PREFIX'),
        getFakeLocation('READWRITE', 'BUCKET'),
        getFakeLocation('READWRITE', 'OBJECT'),
        getFakeLocation('READWRITE', 'PREFIX'),
      ].map(parseLocationAccess)
    );
    expect(output.nextToken).toBeUndefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
});
