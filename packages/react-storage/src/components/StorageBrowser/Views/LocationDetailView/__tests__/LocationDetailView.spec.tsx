import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/controls';

import { LocationDetailView } from '../LocationDetailView';

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

const handleList = jest.fn();

jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
  {
    data: { result: [{ key: 'test1', type: 'FOLDER' }], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleList,
]);

jest.spyOn(ControlsModule, 'useControl').mockReturnValue([
  {
    location: {
      scope: 's3://test-bucket/*',
      permission: 'READ',
      type: 'BUCKET',
    },
    history: [{ prefix: 'cat-cat/' }],
  },
]);

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailView />
        </Provider>
      );
    });

    expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeDefined();
  });

  it('refreshes table when refresh button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const refreshButton = screen.getByLabelText('Refresh table');

    await act(async () => {
      await user.click(refreshButton);
    });

    expect(handleList).toHaveBeenCalled();
  });
});
