import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ProvidersModule from '../providers';
import * as UIModule from '@aws-amplify/ui';

import { createStorageBrowser } from '../createStorageBrowser';
import { StorageBrowserDisplayText } from '../displayText/types';

const createConfigurationProviderSpy = jest.spyOn(
  ProvidersModule,
  'createConfigurationProvider'
);

const setCustomUserAgentSpy = jest.spyOn(UIModule, 'setUserAgent');

const accountId = '012345678901';
const customEndpoint = 'mock-endpoint';
const getLocationCredentials = jest.fn();
const listLocations = jest.fn();
const region = 'region';

const config = {
  accountId,
  customEndpoint,
  getLocationCredentials,
  listLocations,
  region,
  registerAuthListener: jest.fn(),
};

const input = { config };

describe('createStorageBrowser', () => {
  beforeAll(() => {
    // defining `crypto` here to allow `useDataState` to continue working as this test file
    // is covering a fair amount of component code as a side effect. Not ideal and should be
    // readdressed
    let id = 0;
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => ++id },
    });
  });

  it('throws when registerAuthListener is not a function', () => {
    const input = {
      config: { getLocationCredentials, listLocations, region },
    };

    // @ts-expect-error intentionally omit registerAuthListener
    expect(() => createStorageBrowser(input)).toThrow(
      'StorageBrowser: `registerAuthListener` must be a function.'
    );
  });

  it('renders the `LocationsView` by default', async () => {
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();

    expect(createConfigurationProviderSpy).toHaveBeenCalledWith({
      accountId: config.accountId,
      displayName: 'ConfigurationProvider',
      customEndpoint: config.customEndpoint,
      getLocationCredentials: config.getLocationCredentials,
      region: config.region,
      registerAuthListener: config.registerAuthListener,
    });
  });

  it('support passing custom displayText', async () => {
    const { StorageBrowser } = createStorageBrowser(input);
    const displayText: StorageBrowserDisplayText = {
      LocationsView: { title: 'Hello' },
    };
    await waitFor(() => {
      render(<StorageBrowser displayText={displayText} />);
    });

    const Title = screen.getByText('Hello');
    expect(Title).toBeInTheDocument();
  });

  it('sets a custom user agent', async () => {
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      componentName: 'StorageBrowser',
      packageName: 'react-storage',
      // prefer non-static string - `version` field is updated on each package bump
      version: expect.any(String),
    });
  });

  it('should accept custom error boundary', async () => {
    class CustomErrorBoundary extends React.Component<React.PropsWithChildren> {
      constructor(props: React.PropsWithChildren) {
        super(props);
      }

      render() {
        const { children } = this.props;
        return (
          <div>
            <p>Custom Error Boundary</p>
            {children}
          </div>
        );
      }
    }

    const { StorageBrowser } = createStorageBrowser({
      config: input.config,
      ErrorBoundary: CustomErrorBoundary,
    });

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByText('Custom Error Boundary')).toBeInTheDocument();
  });

  it('should support disabling error boundary', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: input.config,
      ErrorBoundary: null,
    });

    const LocationsViewWithError = () => {
      React.useEffect(() => {
        throw new Error('Unexpected Error');
      }, []);
      return <StorageBrowser.LocationsView />;
    };

    expect(() => {
      render(
        <StorageBrowser
          views={{
            LocationsView: LocationsViewWithError,
          }}
        />
      );
    }).toThrow('Unexpected Error');
  });
});
