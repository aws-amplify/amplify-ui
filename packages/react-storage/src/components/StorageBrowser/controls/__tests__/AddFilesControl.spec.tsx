import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddFilesControl } from '../AddFilesControl';
import { useAddFiles } from '../hooks/useAddFiles';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useAddFiles');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/AddFiles', () => ({
  AddFiles: () => <div data-testid="add-files" />,
}));

describe('AddFilesControl', () => {
  // assert mocks
  const mockUseAddFiles = jest.mocked(useAddFiles);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseAddFiles.mockClear();
  });

  it('renders', () => {
    render(<AddFilesControl />);

    const AddFiles = screen.getByTestId('add-files');

    expect(AddFiles).toBeInTheDocument();
  });
});
