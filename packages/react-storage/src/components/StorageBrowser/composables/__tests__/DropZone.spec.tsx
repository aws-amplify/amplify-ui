import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDropZone } from '@aws-amplify/ui-react-core';
import { DropZone } from '../DropZone';

jest.mock('@aws-amplify/ui-react-core');

describe('DropZone', () => {
  // assert mocks
  const mockUseDropZone = useDropZone as jest.Mock;

  beforeEach(() => {
    mockUseDropZone.mockReturnValue({ dragState: 'inactive' });
  });

  afterEach(() => {
    mockUseDropZone.mockReset();
  });

  it('renders', () => {
    render(
      <DropZone>
        <table />
      </DropZone>
    );

    const child = screen.getByRole('table');

    expect(child.parentElement).toHaveClass(
      'amplify-storage-browser__drop-zone'
    );
  });

  it('calls onDropFiles', () => {
    const files = [new File([], '')];
    const mockOnDropFiles = jest.fn();
    mockUseDropZone.mockImplementation(
      ({
        onDropComplete,
      }: {
        onDropComplete: ({ acceptedFiles }: { acceptedFiles: File[] }) => void;
      }) => {
        onDropComplete({ acceptedFiles: files });
        return { dragState: 'inactive' };
      }
    );

    render(
      <DropZone onDropFiles={mockOnDropFiles}>
        <table />
      </DropZone>
    );

    expect(mockOnDropFiles).toHaveBeenCalledWith(files);
  });

  it('appends an active modifier', () => {
    mockUseDropZone.mockReturnValue({ dragState: 'accept' });

    render(
      <DropZone>
        <table />
      </DropZone>
    );

    const child = screen.getByRole('table');

    expect(child.parentElement).toHaveClass(
      'amplify-storage-browser__drop-zone--active'
    );
  });
});
