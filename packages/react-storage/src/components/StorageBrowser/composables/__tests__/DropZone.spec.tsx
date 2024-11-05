import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDropZone } from '@aws-amplify/ui-react-core';
import { DropZone, DropZoneProps } from '../DropZone';

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

    expect(child.parentElement).toHaveClass('storage-browser__drop-zone');
  });

  it('calls onDropComplete', () => {
    const acceptedFiles = [new File([], '')];
    const mockOnDropComplete = jest.fn();
    mockUseDropZone.mockImplementation(
      ({
        onDropComplete,
      }: {
        onDropComplete: DropZoneProps['onDropComplete'];
      }) => {
        onDropComplete!({ acceptedFiles });
        return { dragState: 'inactive' };
      }
    );

    render(
      <DropZone onDropComplete={mockOnDropComplete}>
        <table />
      </DropZone>
    );

    expect(mockOnDropComplete).toHaveBeenCalledWith({ acceptedFiles });
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
      'storage-browser__drop-zone--active'
    );
  });
});
