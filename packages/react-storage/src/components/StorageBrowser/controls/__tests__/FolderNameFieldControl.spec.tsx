import React from 'react';
import { render, screen } from '@testing-library/react';
import { FolderNameFieldControl } from '../FolderNameFieldControl';
import { useFolderNameField } from '../hooks/useFolderNameField';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useFolderNameField');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/FolderNameField', () => ({
  FolderNameField: () => <div data-testid="folder-name-field" />,
}));

describe('FolderNameFieldControl', () => {
  const mockUseFolderNameField = jest.mocked(useFolderNameField);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseFolderNameField.mockClear();
  });

  it('renders', () => {
    render(<FolderNameFieldControl />);

    const folderNameField = screen.getByTestId('folder-name-field');

    expect(folderNameField).toBeInTheDocument();
  });
});
