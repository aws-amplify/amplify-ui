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
  registerAuthListener: jest.fn(),
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

  it('handles the create folder button', async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderActionView />
        </Provider>
      );
    });

    const setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', setState]);

    waitFor(async () => {
      const input = screen.getByLabelText('Enter folder name:');
      const button = screen.getByRole('button', { name: 'Create Folder' });

      user.type(input, 'test');

      await user.click(button);

      expect(setState).toHaveBeenCalled();
    });
  });
});
