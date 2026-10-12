import * as React from 'react';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { render, screen, waitFor } from '@testing-library/react';
import * as maplibreMock from 'maplibre-gl';

import { MapView } from '..';

jest.mock('maplibre-gl-js-amplify', () => ({
  AmplifyMapLibreRequest: jest.fn().mockImplementation(() => {
    return {
      amplifyTransformRequest: true,
      transformRequest: (url: URL | string, resourceType: string) => {
        if (
          resourceType === 'Style' &&
          typeof url === 'string' &&
          !url.includes('://')
        ) {
          url = `https://maps.geo.us-east-2.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
        }
        if (new URL(url).hostname.endsWith('.amazonaws.com')) {
          return {
            url: 'https://maps.geo.us-east-2.amazonaws.com/maps/v0/maps/map5df169f7-staging/style-descriptor',
          };
        }
      },
    };
  }),
}));

const reactMapGlProps = jest.fn();

// Mock react-map-gl to check just that ReactMapGL component is rendered, and not what it actually renders.
jest.mock(
  'react-map-gl/maplibre',
  () =>
    function ReactMapGlMock(props: Record<string, unknown>) {
      reactMapGlProps(props);
      return <div data-testid="react-map-gl-mock" />;
    }
);

jest.mock('aws-amplify/auth', () => {
  const originalModule = jest.requireActual('aws-amplify/auth');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...originalModule,
    fetchAuthSession: jest.fn(),
  };
});

const getConfigSpy = jest.spyOn(Amplify, 'getConfig');
const partialAmplifyConfig: ResourcesConfig = {
  Geo: {
    LocationService: {
      region: 'us-east-1',
    },
  },
};

const credentials = {
  accessKeyId: '001122',
  authenticated: true,
  sessionToken: 'abcabc',
  secretAccessKey: 'abcabc',
  identityId: 'us-east-2:abcabc',
};

const getLastReactMapGlProps = () => {
  const calls = reactMapGlProps.mock.calls as [{ mapLib: unknown }][];
  return calls[calls.length - 1][0];
};

describe('Map component', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    getConfigSpy.mockReturnValue(partialAmplifyConfig);
    (fetchAuthSession as jest.Mock).mockResolvedValue({ credentials });
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    reactMapGlProps.mockClear();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should render', async () => {
    render(<MapView />);
    expect(await screen.findByTestId('react-map-gl-mock')).toBeInTheDocument();
  });

  it('passes a promise of the bundled maplibre-gl to react-map-gl as mapLib', async () => {
    render(<MapView />);
    await screen.findByTestId('react-map-gl-mock');

    const { mapLib } = getLastReactMapGlProps();
    expect(mapLib).toBeInstanceOf(Promise);
    expect(await mapLib).toHaveProperty('Map', maplibreMock.Map);
  });

  it('passes a consumer-provided mapLib through unchanged', async () => {
    const customMapLib = Promise.resolve(maplibreMock);
    render(<MapView mapLib={customMapLib as never} />);
    await screen.findByTestId('react-map-gl-mock');

    expect(getLastReactMapGlProps().mapLib).toBe(customMapLib);
  });

  it('logs and renders nothing when fetching credentials fails', async () => {
    const error = new Error('No credentials');
    (fetchAuthSession as jest.Mock).mockRejectedValue(error);

    const { container } = render(<MapView />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('failed to fetch Amplify credentials'),
        error
      );
    });
    expect(container).toBeEmptyDOMElement();
  });
});
