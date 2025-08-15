import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileMetadata } from '../FileMetadata';
import type { FileData } from '../../../../actions';

const mockFileData: FileData = {
  key: 'test-file.jpg',
  lastModified: new Date('2023-01-01T12:00:00Z'),
  size: 1024,
  eTag: '"abc123"',
  versionId: 'v1.0',
  type: 'FILE',
  id: 'test-id',
};

describe('FileMetadata', () => {
  it('renders all file metadata fields', () => {
    render(<FileMetadata fileData={mockFileData} />);

    expect(screen.getByText('File Information')).toBeInTheDocument();
    expect(screen.getByText('Key:')).toBeInTheDocument();
    expect(screen.getByText('test-file.jpg')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    expect(screen.getByText('Version Id:')).toBeInTheDocument();
    expect(screen.getByText('v1.0')).toBeInTheDocument();
    expect(screen.getByText('Last Modified:')).toBeInTheDocument();
    expect(screen.getByText('Entity tag:')).toBeInTheDocument();
    expect(screen.getByText('"abc123"')).toBeInTheDocument();
    expect(screen.getByText('Type :')).toBeInTheDocument();
    expect(screen.getByText('jpg')).toBeInTheDocument();
  });

  it('handles missing optional fields', () => {
    const minimalFileData: FileData = {
      key: 'test.txt',
      size: 0,
      type: 'FILE',
      id: 'test-id',
      lastModified: new Date(),
    };

    render(<FileMetadata fileData={minimalFileData} />);

    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('handles file without extension', () => {
    const fileDataNoExt: FileData = {
      key: 'README',
      size: 100,
      type: 'FILE',
      id: 'test-id',
      lastModified: new Date(),
    };

    render(<FileMetadata fileData={fileDataNoExt} />);

    const typeLabels = screen.getAllByText(/Type/);
    expect(typeLabels).toHaveLength(1);

    const allNoneTexts = screen.getAllByText('None');
    expect(allNoneTexts.length).toBeGreaterThan(0);
  });
});
