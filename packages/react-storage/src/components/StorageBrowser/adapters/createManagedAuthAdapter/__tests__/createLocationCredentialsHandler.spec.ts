import { getDataAccess } from '../../../storage-internal';
import { createLocationCredentialsHandler } from '../createLocationCredentialsHandler';

jest.mock('../../../storage-internal', () => ({
  getDataAccess: jest.fn(),
}));

const accountId = '123456789012';
const region = 'us-east-1';
const scope = 's3://bucket/prefix/*';
const credentialsProvider = jest.fn();
const customEndpoint = 'mock-endpoint';

describe('createLocationCredentialsHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('passes `instanceScope` to `getDataAccess` with the caller `accountId`', () => {
    const getLocationCredentials = createLocationCredentialsHandler({
      accountId,
      credentialsProvider,
      customEndpoint,
      region,
      instanceScope: 'ALL',
    });

    getLocationCredentials({ scope, permissions: ['get', 'list'] });

    expect(getDataAccess).toHaveBeenCalledTimes(1);
    expect(getDataAccess).toHaveBeenCalledWith({
      accountId,
      credentialsProvider,
      customEndpoint,
      permission: 'READ',
      region,
      scope,
      instanceScope: 'ALL',
    });
  });

  it('passes `instanceScope` as `undefined` when not provided', () => {
    const getLocationCredentials = createLocationCredentialsHandler({
      accountId,
      credentialsProvider,
      region,
    });

    getLocationCredentials({ scope, permissions: ['get', 'list'] });

    expect(getDataAccess).toHaveBeenCalledTimes(1);
    const [input] = jest.mocked(getDataAccess).mock.calls[0];
    expect(input).toHaveProperty('instanceScope', undefined);
    expect(input.accountId).toBe(accountId);
  });
});
