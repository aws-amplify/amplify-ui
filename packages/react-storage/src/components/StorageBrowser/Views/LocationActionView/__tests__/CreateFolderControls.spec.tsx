import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import createProvider from '../../../createProvider';
import userEvent from '@testing-library/user-event';

import {
  isValidFolderName,
  CreateFolderControls,
  FIELD_VALIDATION_MESSAGE,
} from '../CreateFolderControls';

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
            <CreateFolderControls />
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
          <CreateFolderControls />
        </Provider>
      );
    });

    const setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', setState]);

    waitFor(async () => {
      const input = screen.getByLabelText('Enter folder name:');
      const button = screen.getByRole('button', { name: 'Create Folder' });

      user.type(input, 'test/');

      await user.click(button);

      const fieldError = screen.getByText(FIELD_VALIDATION_MESSAGE);

      expect(fieldError).toBe(undefined);
      expect(setState).toHaveBeenCalled();
    });
  });

  it('shows a field error when invalid folder name is entered', async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', setState]);

    const input = screen.getByLabelText('Enter folder name:');

    user.type(input, 'test');

    fireEvent.blur(input);

    const fieldError = screen.getByText(FIELD_VALIDATION_MESSAGE);

    expect(fieldError).toBeInTheDocument();
  });
});

describe('isValidFolderName', () => {
  it('returns false for isValidFolderName when name is undefined', () => {
    expect(isValidFolderName(undefined)).toBe(false);
  });

  it('returns false for isValidFolderName when name is only one character', () => {
    expect(isValidFolderName('/')).toBe(false);
  });

  it('returns false for isValidFolderName when name is missing trailing slash', () => {
    expect(isValidFolderName('Kiwi')).toBe(false);
  });

  it('returns true for isValidFolderName when name is valid', () => {
    expect(isValidFolderName('Kiwi/')).toBe(true);
  });
});
