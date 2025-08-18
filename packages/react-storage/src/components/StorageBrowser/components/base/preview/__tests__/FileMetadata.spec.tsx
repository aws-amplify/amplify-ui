import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileMetadata } from '../FileMetadata';
import type { FileData } from '../../../../actions';

jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    LocationDetailView: {
      filePreview: {
        fileInformationTitle: 'File Information',
        keyLabel: 'Key',
        sizeLabel: 'Size',
        versionIdLabel: 'Version Id',
        lastModifiedLabel: 'Last Modified',
        entityTagLabel: 'Entity tag',
        typeLabel: 'Type',
        unknownValue: 'Unknown',
      },
    },
  }),
}));

describe('FileMetadata', () => {
  const mockFileData: FileData = {
    key: 'test-folder/test-file.jpg',
    size: 1024,
    type: 'FILE',
    id: 'test-id',
    lastModified: new Date('2023-01-01T00:00:00Z'),
    eTag: 'test-etag',
    versionId: 'test-version',
  };

  it('renders file information with custom display text', () => {
    render(<FileMetadata fileData={mockFileData} />);

    expect(screen.getByText('File Information')).toBeInTheDocument();
    expect(screen.getByText('Key:')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('Version Id:')).toBeInTheDocument();
    expect(screen.getByText('Last Modified:')).toBeInTheDocument();
    expect(screen.getByText('Entity tag:')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
  });

  it('displays unknown value when lastModified is missing', () => {
    const fileDataWithoutDate = { ...mockFileData, lastModified: undefined };
    //@ts-expect-error lastModified is undefined
    render(<FileMetadata fileData={fileDataWithoutDate} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('displays file values correctly', () => {
    render(<FileMetadata fileData={mockFileData} />);

    expect(screen.getByText('test-folder/test-file.jpg')).toBeInTheDocument();
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    expect(screen.getByText('test-version')).toBeInTheDocument();
    expect(screen.getByText('test-etag')).toBeInTheDocument();
  });
});
