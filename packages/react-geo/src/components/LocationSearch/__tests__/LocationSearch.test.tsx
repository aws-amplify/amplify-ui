import * as React from 'react';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { render, waitFor } from '@testing-library/react';

import { LocationSearch } from '..';
import * as utils from '../../utils';

const getConfigSpy = jest.spyOn(Amplify, 'getConfig');
const partialAmplifyConfig: ResourcesConfig = {
  Geo: {
    LocationService: {
      region: 'us-east-1',
    },
  },
};

describe('LocationSearch component', () => {
  beforeEach(() => {
    getConfigSpy.mockReturnValue(partialAmplifyConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    const { container } = render(<LocationSearch />);

    await waitFor(() => {
      expect(
        container.getElementsByClassName('maplibregl-ctrl-geocoder').length
      ).toBe(1);
    });
  });

  it('renders the standalone container before the geocoder modules resolve', () => {
    jest
      .spyOn(utils, 'loadMaplibreGlJsAmplify')
      .mockReturnValue(new Promise(() => {}));

    const { container } = render(<LocationSearch />);

    expect(container.querySelector('#geocoder-container')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('maplibregl-ctrl-geocoder')
    ).toHaveLength(0);
  });

  it('logs an error and keeps the empty container when the geocoder modules fail to load', async () => {
    const error = new Error('ChunkLoadError');
    jest.spyOn(utils, 'loadMaplibreGlJsAmplify').mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { container } = render(<LocationSearch />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('LocationSearch: failed to load'),
        error
      );
    });
    expect(container.querySelector('#geocoder-container')).toBeInTheDocument();
  });
});
