import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { render, screen } from '@testing-library/react';

import { MapView } from '..';

// The missing `workerUrl` warning is logged once per module instance, so these tests live in their own file.

jest.mock('maplibre-gl-js-amplify', () => ({
  AmplifyMapLibreRequest: jest.fn().mockImplementation(() => ({
    transformRequest: jest.fn(),
  })),
}));

jest.mock(
  'react-map-gl/maplibre',
  () =>
    function ReactMapGlMock() {
      return <div data-testid="react-map-gl-mock" />;
    }
);

jest.mock('aws-amplify/auth', () => ({
  fetchAuthSession: jest.fn(),
}));

describe('MapView workerUrl warning', () => {
  it('warns once in development when neither workerUrl nor mapLib is provided', async () => {
    jest
      .spyOn(Amplify, 'getConfig')
      .mockReturnValue({ Geo: { LocationService: { region: 'us-east-1' } } });
    (fetchAuthSession as jest.Mock).mockResolvedValue({
      credentials: { accessKeyId: 'a', secretAccessKey: 'b' },
    });
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { unmount } = render(<MapView workerUrl="/maplibre-gl-worker.mjs" />);
    await screen.findByTestId('react-map-gl-mock');
    unmount();
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    const second = render(<MapView />);
    await screen.findByTestId('react-map-gl-mock');
    second.unmount();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('`workerUrl` is not set')
    );

    render(<MapView />);
    await screen.findByTestId('react-map-gl-mock');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

    consoleWarnSpy.mockRestore();
  });
});
