import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import createProvider from '../../../createProvider';
import userEvent from '@testing-library/user-event';

import { CreateFolderActionView } from '../CreateFolderActionView';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};
const Provider = createProvider({ config });

describe('CreateFolderActionView', () => {
  it('renders a CreateFolderActionView', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <CreateFolderActionView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });

  // @TODO: Placeholder test to help with testing coverage
  // Update with actual button click action
  it('handles the create folder button', async () => {
    const user = userEvent.setup();

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((_message) => null);

    await waitFor(async () => {
      render(
        <Provider>
          <CreateFolderActionView />
        </Provider>
      );

      const button = screen.getByRole('button', { name: 'Create folder' });

      await user.click(button);

      expect(consoleLogSpy).toHaveBeenCalledWith('create folder');
    });
  });
});
