import { createManagedAuthAdapter } from '../../../adapters/createManagedAuthAdapter/createManagedAuthAdapter';
import { createLocationCredentialsHandler } from '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler';
import { listLocationsHandler } from '../../../actions';

jest.mock(
  '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler'
);
jest.mock('../../../actions', () => ({
  ...jest.requireActual<object>('../../../actions'),
  listLocationsHandler: jest.fn(),
}));

const mockCreateLocationCredentialsHandler = jest.mocked(
  createLocationCredentialsHandler
);
const mockListLocationsHandler = jest.mocked(listLocationsHandler);

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

  it('should thread instanceScope to the location credentials handler', () => {
    createManagedAuthAdapter({
      region,
      accountId,
      credentialsProvider,
      customEndpoint,
      registerAuthListener: mockRegisterAuthListener,
      instanceScope: 'ALL',
    });

    expect(mockCreateLocationCredentialsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ instanceScope: 'ALL' })
    );
  });

  it('should default instanceScope to undefined when not provided', () => {
    const adapter = createManagedAuthAdapter({
      region,
      accountId,
      credentialsProvider,
      customEndpoint,
      registerAuthListener: mockRegisterAuthListener,
    });

    // credentials handler receives instanceScope: undefined (no SELF default here)
    expect(mockCreateLocationCredentialsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ instanceScope: undefined })
    );

    // and the list locations handler forwards the same undefined through config
    adapter.listLocations({});
    expect(mockListLocationsHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({ instanceScope: undefined }),
      })
    );
  });
});
