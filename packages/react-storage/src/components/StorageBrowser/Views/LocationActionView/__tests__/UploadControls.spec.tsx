import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/controls';
import createProvider from '../../../createProvider';

import { UploadControls } from '../UploadControls';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ config });

describe('UploadControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display "No items selected." when no items are selected', async () => {
    useControlSpy.mockReturnValueOnce([{ selected: { items: null } }]);
    useControlSpy.mockReturnValueOnce([{ history: [] }]);

    // @TODO: figure out how to mock state better
    // useControlSpy.mockImplementation((obj) => {
    //   const { type } = obj;

    //   if (type === 'ACTION_SELECT') {
    //     return [{ state: { selected: { items: [] } } }, jest.fn()];
    //   }

    //   if (type === 'NAVIGATE') {
    //     return [
    //       {
    //         location: { scope: 's3://test-bucket/*', type: 'BUCKET' },
    //         history: ['', 'folder1/', 'folder2/', 'folder3/'],
    //       },
    //     ];
    //   }
    // });

    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No items selected.')).toBeInTheDocument();
    });
  });
});
