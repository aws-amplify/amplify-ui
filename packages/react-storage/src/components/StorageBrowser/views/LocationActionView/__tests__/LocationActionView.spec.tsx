import React from 'react';
import { render } from '@testing-library/react';

import * as StoreModule from '../../../providers/store';

import { LocationActionView } from '../LocationActionView';

jest.mock('../CreateFolderView', () => ({
  CreateFolderView: () => <div data-testid="create-folder-view" />,
}));
jest.mock('../CopyView', () => ({
  CopyView: () => <div data-testid="copy-view" />,
}));
jest.mock('../DeleteView', () => ({
  DeleteView: () => <div data-testid="delete-view" />,
}));
jest.mock('../UploadView', () => ({
  UploadView: () => <div data-testid="upload-view" />,
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

  it.each([
    {
      view: 'CreateFolderView',
      actionType: 'createFolder',
      testId: 'create-folder-view',
    },
    {
      view: 'CopyView',
      actionType: 'copy',
      testId: 'copy-view',
    },
    {
      view: 'DeleteView',
      actionType: 'delete',
      testId: 'delete-view',
    },
    {
      view: 'UploadView',
      actionType: 'upload',
      testId: 'upload-view',
    },
  ])(
    'returns `$view` when `actionType` is "$actionType"',
    ({ actionType, testId }) => {
      const mockStore = { actionType } as StoreModule.UseStoreState;
      useStoreSpy.mockReturnValueOnce([mockStore, jest.fn()]);

      const { getByTestId } = render(<LocationActionView />);

      expect(getByTestId(testId)).toBeInTheDocument();
    }
  );
});
