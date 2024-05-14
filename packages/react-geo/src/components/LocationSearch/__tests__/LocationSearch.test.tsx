import * as React from 'react';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { render } from '@testing-library/react';

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
  it('should render', () => {
    getConfigSpy.mockReturnValue(partialAmplifyConfig);
    const { container } = render(<LocationSearch />);
    const elements = container.getElementsByClassName(
      'maplibregl-ctrl-geocoder'
    );

    expect(elements.length).toBe(1);
  });
});
