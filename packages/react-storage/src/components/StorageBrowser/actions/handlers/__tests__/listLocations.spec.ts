import {
  listCallerAccessGrants,
  ListLocationsOutput,
  LocationCredentialsProvider,
  LocationAccess,
} from '../../../storage-internal';

import { parseAccessGrantLocations } from '../utils';

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
const customEndpoint = 'mock-endpoint';
const DEFAULT_PAGE_SIZE = 5;

const input: ListLocationsHandlerInput = {
  config: { accountId, credentials, customEndpoint, region, bucket },
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
      parseAccessGrantLocations(mockOutput.locations, input.options?.exclude)
    );
    expect(result.nextToken).toBeUndefined();
    expect(mockListCallerAccessGrants).toHaveBeenCalledTimes(1);
    expect(mockListCallerAccessGrants).toHaveBeenCalledWith({
      accountId: input.config.accountId,
      credentialsProvider: input.config.credentials,
      customEndpoint: input.config.customEndpoint,
      nextToken: input.options?.nextToken,
      pageSize: input.options?.pageSize,
      region: input.config.region,
    });
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
      ...parseAccessGrantLocations(
        mockOutputPage1.locations,
        input.options?.exclude
      ),
      ...parseAccessGrantLocations(
        mockOutputPage2.locations,
        input.options?.exclude
      ),
      ...parseAccessGrantLocations(
        mockOutputPage3.locations,
        input.options?.exclude
      ),
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
