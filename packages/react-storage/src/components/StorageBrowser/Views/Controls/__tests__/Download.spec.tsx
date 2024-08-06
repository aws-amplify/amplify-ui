import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as StorageModule from 'aws-amplify/storage';
import * as ControlsModule from '../../../context/controls/';

import createProvider from '../../../createProvider';
import { DownloadControl } from '../Download';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const downloadSpy = jest.spyOn(StorageModule, 'downloadData');

const handleUpdateControlState = jest.fn();
const controlState = {
  location: {
    scope: 's3://test-bucket/*',
    permission: 'READ',
    type: 'BUCKET',
  },
  history: ['test-bucket'],
};

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

useControlSpy.mockReturnValue([controlState, handleUpdateControlState]);

const Provider = createProvider({ config });

describe('DownloadControl', () => {
  beforeEach(() => {
    useControlSpy.mockClear();
    downloadSpy.mockClear();
    handleUpdateControlState.mockClear();
  });

  it('renders the DownloadControl', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <DownloadControl key="" />
          </Provider>
        ).container
      ).toBeDefined();
    });

    const button = screen.getByRole('button', {
      name: 'Download item',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls downloadData onClick', async () => {
    // @ts-expect-error
    downloadSpy.mockResolvedValueOnce({ key: 'a_key' });

    await waitFor(() => {
      render(
        <Provider>
          <DownloadControl key="" />
        </Provider>
      );
      const button = screen.getByRole('button', {
        name: 'Download item',
      });
      fireEvent.click(button);
    });

    expect(downloadSpy).toHaveBeenCalled();
  });
});
