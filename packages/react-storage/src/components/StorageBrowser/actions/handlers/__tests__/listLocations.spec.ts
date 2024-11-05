import {
  listCallerAccessGrants,
  ListLocationsOutput,
  LocationCredentialsProvider,
} from '../../../storage-internal';

import { LocationAccess } from '../types';
import { parseLocations } from '../utils';

import {
  listLocationsHandler,
  ListLocationsHandlerInput,
} from '../listLocations';

jest.mock('../../../storage-internal');

const mockListCallerAccessGrants = jest.mocked(listCallerAccessGrants);

const generateMockLocations = (size: number, mockLocations: LocationAccess) =>
  Array<LocationAccess>(size).fill(mockLocations);

const accountId = 'account-id';
const credentials: LocationCredentialsProvider = jest.fn();
const region = 'region';
const bucket = 'bucket';
const DEFAULT_PAGE_SIZE = 5;

const input: ListLocationsHandlerInput = {
  config: { accountId, credentials, region, bucket },
  options: {
    pageSize: DEFAULT_PAGE_SIZE,
    nextToken: undefined,
    exclude: 'READ',
  },
  prefix: 'prefix',
};

describe('listLocationsHandler', () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'intentionally-static-test-id' },
    });
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch a single page of results successfully', async () => {
    const mockOutput: ListLocationsOutput = {
      locations: [
        { scope: 's3://bucket/prefix', permission: 'READ', type: 'PREFIX' },
      ],
      nextToken: undefined,
    };

    mockListCallerAccessGrants.mockResolvedValueOnce(mockOutput);

    const result = await listLocationsHandler(input);

    expect(result.items).toEqual(
      parseLocations(mockOutput.locations, input.options?.exclude)
    );
    expect(result.nextToken).toBeUndefined();
    expect(mockListCallerAccessGrants).toHaveBeenCalledTimes(1);
  });

  it('should fetch multiple pages of results successfully', async () => {
    const mockLocation: LocationAccess = {
      scope: 's3://bucket/prefix1',
      permission: 'READ',
      type: 'PREFIX',
    };
    const mockOutputPage1: ListLocationsOutput = {
      locations: [mockLocation],
      nextToken: 'token1',
    };

    const mockOutputPage2: ListLocationsOutput = {
      locations: [...generateMockLocations(2, mockLocation)],
      nextToken: 'token2',
    };

    const mockOutputPage3: ListLocationsOutput = {
      locations: [...generateMockLocations(2, mockLocation)],
      nextToken: undefined,
    };

    mockListCallerAccessGrants
      .mockResolvedValueOnce(mockOutputPage1)
      .mockResolvedValueOnce(mockOutputPage2)
      .mockResolvedValueOnce(mockOutputPage3);

    const result = await listLocationsHandler(input);

    expect(result.items).toEqual([
      ...parseLocations(mockOutputPage1.locations, input.options?.exclude),
      ...parseLocations(mockOutputPage2.locations, input.options?.exclude),
      ...parseLocations(mockOutputPage3.locations, input.options?.exclude),
    ]);
    expect(result.nextToken).toBeUndefined();
    expect(mockListCallerAccessGrants).toHaveBeenCalledTimes(3);
    expect(result.items.length).toEqual(DEFAULT_PAGE_SIZE);
  });

  it('should throw when accountId is not present to fetch Locations', async () => {
    input.config.accountId = undefined;
    await expect(listLocationsHandler(input)).rejects.toThrow(
      'Storage Browser: Must provide accountId to `listCallerAccessGrants`.'
    );
  });
});
