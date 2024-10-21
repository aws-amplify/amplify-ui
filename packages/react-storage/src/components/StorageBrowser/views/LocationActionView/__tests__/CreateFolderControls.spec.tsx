import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import createProvider from '../../../do-not-import-from-here/createTempActionsProvider';
import * as ActionsModule from '../../../do-not-import-from-here/actions';
import * as ControlsModule from '../../../context/control';

import {
  isValidFolderName,
  CreateFolderControls,
  FIELD_VALIDATION_MESSAGE,
  CreateFolderMessage,
  RESULT_COMPLETE_MESSAGE,
  RESULT_FAILED_MESSAGE,
} from '../CreateFolderControls';

const TEST_ACTIONS = {
  CREATE_FOLDER: { options: { displayName: 'Create Folder' } },
};

const useActionSpy = jest.spyOn(ActionsModule, 'useAction');
const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

useControlSpy.mockImplementation(
  (type) =>
    ({
      LOCATION_ACTIONS: [
        {
          actions: TEST_ACTIONS,
          selected: { type: 'CREATE_FOLDER', items: undefined },
        },
        jest.fn(),
      ],
      NAVIGATE: [
        {
          location: {
            scope: 's3://test-bucket/test-prefix/*',
            permission: 'READ',
            type: 'PREFIX',
          },
          history: [{ prefix: 'test-prefix/', position: 0 }],
          path: 'test-prefix/',
        },
        jest.fn(),
      ],
    })[type]
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: TEST_ACTIONS, config });

describe('CreateFolderControls', () => {
  it('handles folder creation in the happy path', async () => {
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: { result: undefined },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const input = screen.getByLabelText('Enter folder name:');
    fireEvent.change(input, { target: { value: 'test-folder-name' } });

    const button = screen.getByRole('button', { name: 'Create Folder' });

    fireEvent.click(button);

    const fieldError = screen.queryByText(FIELD_VALIDATION_MESSAGE);

    expect(fieldError).toBe(null);
    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleAction).toHaveBeenCalledWith({
      prefix: 'test-prefix/test-folder-name/',
    });
  });

  it('shows a field error when invalid folder name is entered', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const input = screen.getByLabelText('Enter folder name:');
    fireEvent.change(input, { target: { value: 'invalid/folder-name' } });
    fireEvent.blur(input);

    const fieldError = screen.getByText(FIELD_VALIDATION_MESSAGE);
    expect(fieldError).toBeInTheDocument();
  });

  it('clears a field error as expected', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const input = screen.getByLabelText('Enter folder name:');
    fireEvent.change(input, { target: { value: 'invalid/folder-name' } });
    fireEvent.blur(input);

    const initialFieldError = screen.queryByText(FIELD_VALIDATION_MESSAGE);
    expect(initialFieldError).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'valid-folder-name' } });
    fireEvent.blur(input);

    const fieldError = screen.queryByText(FIELD_VALIDATION_MESSAGE);
    expect(fieldError).not.toBeInTheDocument();
  });

  it('cleans up on exit', async () => {
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: { result: undefined },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const button = screen.getByRole('button', { name: 'Back' });

    fireEvent.click(button);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleAction).toHaveBeenCalledWith({
      options: { reset: true },
      prefix: '',
    });
  });
  it('shows a success message when result is SUCCESS', async () => {
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: {
          result: { key: 'test', status: 'COMPLETE', message: undefined },
        },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const successMessage = screen.getByText(RESULT_COMPLETE_MESSAGE);

    expect(successMessage).toBeInTheDocument();
  });
  it('shows a default error message when result is ERROR', async () => {
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: { result: { key: 'test', status: 'FAILED', message: undefined } },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderControls />
        </Provider>
      );
    });

    const successMessage = screen.getByText(RESULT_FAILED_MESSAGE);

    expect(successMessage).toBeInTheDocument();
  });

  it('shows a returned error message when result is ERROR', async () => {
    const errorMessage = 'Network error';
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: {
          result: { key: 'test', status: 'FAILED', message: errorMessage },
        },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderMessage />
        </Provider>
      );
    });

    const successMessage = screen.getByText(errorMessage);

    expect(successMessage).toBeInTheDocument();
  });

  it('does not show a Message if no result', async () => {
    const handleAction = jest.fn();
    useActionSpy.mockReturnValue([
      {
        isLoading: false,
        data: {
          result: undefined,
        },
        message: undefined,
        hasError: false,
      },
      handleAction,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <CreateFolderMessage />
        </Provider>
      );
    });

    const message = screen.queryByRole('alert');

    expect(message).not.toBeInTheDocument();
  });
});

describe('isValidFolderName', () => {
  it('returns false when value is undefined', () => {
    expect(isValidFolderName(undefined)).toBe(false);
  });

  it('returns false when value is an empty string', () => {
    expect(isValidFolderName('')).toBe(false);
  });

  it('returns false if value contains a slash', () => {
    expect(isValidFolderName('Fruit/Kiwi')).toBe(false);
  });

  it('returns true for isValidFolderName when name is valid', () => {
    expect(isValidFolderName('Kiwi')).toBe(true);
  });
});
