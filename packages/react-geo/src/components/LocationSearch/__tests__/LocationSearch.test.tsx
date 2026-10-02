import * as React from 'react';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { render, waitFor } from '@testing-library/react';

import { LocationSearch } from '..';

const getConfigSpy = jest.spyOn(Amplify, 'getConfig');
const partialAmplifyConfig: ResourcesConfig = {
  Geo: {
    LocationService: {
      region: 'us-east-1',
    },
  },
};

describe('LocationSearch component', () => {
  it('should render', async () => {
    getConfigSpy.mockReturnValue(partialAmplifyConfig);
    const { container } = render(<LocationSearch />);

    await waitFor(() => {
      expect(
        container.getElementsByClassName('maplibregl-ctrl-geocoder').length
      ).toBe(1);
    });
  });
});
