// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createManagedAuthAdapter } from '../../../adapters/createManagedAuthAdapter/createManagedAuthAdapter';
import { createListLocationsHandler } from '../../../adapters/createManagedAuthAdapter/createListLocationsHandler';
import { createLocationCredentialsHandler } from '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler';

jest.mock(
  '../../../adapters/createManagedAuthAdapter/createListLocationsHandler'
);
jest.mock(
  '../../../adapters/createManagedAuthAdapter/createLocationCredentialsHandler'
);

const mockCreateListLocationsHandler = jest.mocked(createListLocationsHandler);
const mockCreateLocationCredentialsHandler = jest.mocked(
  createLocationCredentialsHandler
);

describe('createManagedAuthConfigAdapter', () => {
  const region = 'us-foo-2';
  const accountId = 'XXXXXXXXXXXX';
  const credentialsProvider = jest.fn();
  const mockCreatedListLocationsHandler = jest.fn();
  const mockCreatedLocationCredentialsHandler = jest.fn();
  const mockRegisterAuthListener = jest.fn();

  beforeEach(() => {
    mockCreateListLocationsHandler.mockReturnValue(
      mockCreatedListLocationsHandler
    );
    mockCreateLocationCredentialsHandler.mockReturnValue(
      mockCreatedLocationCredentialsHandler
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass region to the adapter', () => {
    expect(
      createManagedAuthAdapter({
        region,
        credentialsProvider: jest.fn(),
        accountId,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      region,
    });
  });

  it('should create list locations handler', () => {
    expect(
      createManagedAuthAdapter({
        region,
        accountId,
        credentialsProvider,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      listLocations: mockCreatedListLocationsHandler,
    });
    expect(mockCreateListLocationsHandler).toHaveBeenCalledWith({
      region,
      accountId,
      credentialsProvider,
    });
  });

  it('should create get location credentials handler', () => {
    expect(
      createManagedAuthAdapter({
        region,
        accountId,
        credentialsProvider,
        registerAuthListener: mockRegisterAuthListener,
      })
    ).toMatchObject({
      getLocationCredentials: mockCreatedLocationCredentialsHandler,
    });
    expect(mockCreateLocationCredentialsHandler).toHaveBeenCalledWith({
      region,
      accountId,
      credentialsProvider,
    });
  });
});
