import {
  listCallerAccessGrants,
  ListLocationsOutput,
  LocationCredentialsProvider,
} from '../../../storage-internal';
import {
  listLocationsHandler,
  ListLocationsHandlerInput,
} from '../listLocations';
import { LocationAccess } from '../types';
import { parseLocations } from '../utils';

jest.mock('../../../storage-internal');

const mockListCallerAccessGrants = jest.mocked(listCallerAccessGrants);

const generateMockLocations = (size: number, mockLocations: LocationAccess) =>
  Array<LocationAccess>(size).fill(mockLocations);

describe('listLocationsHandler', () => {
  const accountId = 'account-id';
  // eslint-disable-next-line @typescript-eslint/require-await
  const credentials: LocationCredentialsProvider = async () => ({
    credentials: {
      accessKeyId: 'access-key',
      secretAccessKey: 'secret-key',
      sessionToken: 'session-token',
      expiration: new Date(),
    },
  });
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

  beforeEach(() => {
    jest.clearAllMocks();
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

    expect(result.items).toEqual(parseLocations(mockOutput.locations));
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
      ...parseLocations(mockOutputPage1.locations),
      ...parseLocations(mockOutputPage2.locations),
      ...parseLocations(mockOutputPage3.locations),
    ]);
    expect(result.nextToken).toBeUndefined();
    expect(mockListCallerAccessGrants).toHaveBeenCalledTimes(3);
    expect(result.items.length).toEqual(DEFAULT_PAGE_SIZE);
  });
});
