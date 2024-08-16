import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';

import { LocationDetailView } from '../LocationDetailView';
import userEvent from '@testing-library/user-event';

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

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationDetailView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });

  it('refreshes table when refresh button is clicked', () => {
    const user = userEvent.setup();

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const refreshButton = screen.getByLabelText('Refresh table');

    act(() => {
      user.click(refreshButton);
    });

    waitFor(() => {
      expect(handleList).toHaveBeenCalled();
    });
  });
});
