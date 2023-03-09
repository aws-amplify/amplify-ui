import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Amplify, Auth } from 'aws-amplify';

import { MapView } from '../index';

import { act } from 'react-dom/test-utils';

jest.mock('maplibre-gl-js-amplify', () => ({
  AmplifyMapLibreRequest: jest.fn().mockImplementation(() => {
    return {
      amplifyTransformRequest: true,
      transformRequest: (url, resourceType) => {
        if (resourceType === 'Style' && !url.includes('://')) {
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

// Mock react-map-gl to check just that ReactMapGL component is rendered, and not what it actually renders.
jest.mock('react-map-gl', () => () => {
  return <div data-testid="react-map-gl-mock" />;
});

const configureSpy = jest.spyOn(Amplify, 'configure');
const partialAmplifyConfig = {
  geo: {
    amazon_location_service: {
      region: 'us-east-1',
    },
  },
};

const currentUserCredentialsSpy = jest.spyOn(Auth, 'currentUserCredentials');
const currentUserCredentials = {
  accessKeyId: '001122',
  authenticated: true,
  sessionToken: 'abcabc',
  secretAccessKey: 'abcabc',
  identityId: 'us-east-2:abcabc',
};
currentUserCredentialsSpy.mockImplementation(() =>
  Promise.resolve(currentUserCredentials)
);

describe('Map component', () => {
  it('should render', async () => {
    configureSpy.mockReturnValue(partialAmplifyConfig);
    await act(async () => {
      render(<MapView />);
    });
    expect(screen.getByTestId('react-map-gl-mock')).toBeInTheDocument();
  });
});
