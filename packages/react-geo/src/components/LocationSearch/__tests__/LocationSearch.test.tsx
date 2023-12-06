import * as React from 'react';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

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
