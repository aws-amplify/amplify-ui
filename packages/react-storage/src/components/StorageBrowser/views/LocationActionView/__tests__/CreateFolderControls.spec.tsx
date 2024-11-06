import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import * as ActionsModule from '../../../do-not-import-from-here/actions';
import * as StoreModule from '../../../providers/store';

import {
  isValidFolderName,
  CreateFolderControls,
  FIELD_VALIDATION_MESSAGE,
  CreateFolderMessage,
  RESULT_COMPLETE_MESSAGE,
  RESULT_FAILED_MESSAGE,
} from '../CreateFolderControls';

jest.mock('../utils');

const handleAction = jest.fn();
const useActionSpy = jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
  {
    isLoading: false,
    data: { result: undefined },
    message: undefined,
    hasError: false,
  },
  handleAction,
]);

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  prefix: 'test-prefix/',
  type: 'PREFIX',
};
const storeMock: StoreModule.UseStoreState = {
  location: { current: location, key: 'test-prefix/' },
} as StoreModule.UseStoreState;
const dispatchStoreAction = jest.fn();

jest
  .spyOn(StoreModule, 'useStore')
  .mockReturnValue([storeMock, dispatchStoreAction]);

describe('CreateFolderControls', () => {
  afterEach(jest.clearAllMocks);

  it('handles folder creation in the happy path', async () => {
    await waitFor(() => {
      render(<CreateFolderControls />);
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
      render(<CreateFolderControls />);
    });

    const input = screen.getByLabelText('Enter folder name:');
    fireEvent.change(input, { target: { value: 'invalid/folder-name' } });
    fireEvent.blur(input);

    const fieldError = screen.getByText(FIELD_VALIDATION_MESSAGE);
    expect(fieldError).toBeInTheDocument();
  });

  it('clears a field error as expected', async () => {
    await waitFor(() => {
      render(<CreateFolderControls />);
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
      render(<CreateFolderControls />);
    });

    const button = screen.getByRole('button', { name: 'Exit' });

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
      render(<CreateFolderControls />);
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
      render(<CreateFolderControls />);
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
      render(<CreateFolderMessage />);
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
      render(<CreateFolderMessage />);
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
