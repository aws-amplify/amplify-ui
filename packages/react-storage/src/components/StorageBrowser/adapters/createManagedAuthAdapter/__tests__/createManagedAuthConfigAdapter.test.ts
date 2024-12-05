import { createManagedAuthAdapter } from '../../../adapters/createManagedAuthAdapter/createManagedAuthAdapter';
import { createLocationCredentialsHandler } from '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler';

jest.mock(
  '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler'
);

const mockCreateLocationCredentialsHandler = jest.mocked(
  createLocationCredentialsHandler
);

describe('createManagedAuthConfigAdapter', () => {
  const region = 'us-foo-2';
  const accountId = 'XXXXXXXXXXXX';
  const credentialsProvider = jest.fn();
  const customEndpoint = 'mock-endpoint';
  const mockCreatedLocationCredentialsHandler = jest.fn();
  const mockRegisterAuthListener = jest.fn();

  beforeEach(() => {
    mockCreateLocationCredentialsHandler.mockReturnValue(
      mockCreatedLocationCredentialsHandler
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass region and accountId to the adapter', () => {
    expect(
      createManagedAuthAdapter({
        region,
        credentialsProvider: jest.fn(),
        accountId,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      region,
      accountId,
    });
  });

  it('should create list locations handler', () => {
    expect(
      createManagedAuthAdapter({
        region,
        accountId,
        credentialsProvider,
        customEndpoint,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      listLocations: expect.any(Function),
    });
  });

  it('should create get location credentials handler', () => {
    expect(
      createManagedAuthAdapter({
        region,
        accountId,
        credentialsProvider,
        customEndpoint,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      getLocationCredentials: mockCreatedLocationCredentialsHandler,
    });
    expect(mockCreateLocationCredentialsHandler).toHaveBeenCalledWith({
      region,
      accountId,
      credentialsProvider,
      customEndpoint,
    });
  });
});
