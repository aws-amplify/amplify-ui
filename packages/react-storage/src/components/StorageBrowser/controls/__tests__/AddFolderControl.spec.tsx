import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddFolderControl } from '../AddFolderControl';
import { useAddFolder } from '../hooks/useAddFolder';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useAddFolder');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/AddFolder', () => ({
  AddFolder: () => <div data-testid="add-folder" />,
}));

describe('AddFolderControl', () => {
  const mockUseAddFolder = jest.mocked(useAddFolder);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseAddFolder.mockClear();
  });

  it('renders', () => {
    render(<AddFolderControl />);

    const AddFolder = screen.getByTestId('add-folder');

    expect(AddFolder).toBeInTheDocument();
  });
});
