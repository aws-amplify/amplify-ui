import React from 'react';
import { render } from '@testing-library/react';

import * as StoreModule from '../../../providers/store';

import { LocationActionView } from '../LocationActionView';

jest.mock('../CreateFolderControls', () => ({
  CreateFolderControls: () => <div data-testid="CREATE_FOLDER_CONTROLS" />,
}));
jest.mock('../UploadControls', () => ({
  UploadControls: () => <div data-testid="UPLOAD_CONTROLS" />,
}));

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

describe('LocationActionView', () => {
  it('returns `null` when no `actionType` is provided', () => {
    const mockStore = { actionType: undefined } as StoreModule.UseStoreState;
    useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

    const { container } = render(<LocationActionView />);

    expect(container).toBeEmptyDOMElement();
  });

  it('returns `null` when `actionType` does not have a matching action view', () => {
    const mockStore = { actionType: 'nope' } as StoreModule.UseStoreState;
    useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

    const { container } = render(<LocationActionView />);

    expect(container).toBeEmptyDOMElement();
  });

  it('returns `CreateFolderControls` when `actionType` is "CREATE_FOLDER"', () => {
    const mockStore = {
      actionType: 'CREATE_FOLDER',
    } as StoreModule.UseStoreState;
    useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

    const { getByTestId } = render(<LocationActionView />);

    expect(getByTestId('CREATE_FOLDER_CONTROLS')).toBeInTheDocument();
  });

  it('returns `UploadControls` when `actionType` is "UPLOAD_FILES"', () => {
    const mockStore = {
      actionType: 'UPLOAD_FILES',
    } as StoreModule.UseStoreState;
    useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

    const { getByTestId } = render(<LocationActionView />);

    expect(getByTestId('UPLOAD_CONTROLS')).toBeInTheDocument();
  });

  it('returns `UploadControls` when `actionType` is "UPLOAD_FOLDER"', () => {
    const mockStore = {
      actionType: 'UPLOAD_FOLDER',
    } as StoreModule.UseStoreState;
    useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

    const { getByTestId } = render(<LocationActionView />);

    expect(getByTestId('UPLOAD_CONTROLS')).toBeInTheDocument();
  });
});
