import React from 'react';
import { render, screen } from '@testing-library/react';

import type { FileData } from '../../../actions';
import { FilePreviewLayout } from '../../base/preview/FilePreviewLayout';

jest.mock('../../../displayText', () => ({
  useDisplayText: () => ({
    LocationDetailView: {
      filePreview: {
        filePreviewTitle: 'File Preview',
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

const mockFileData: FileData = {
  key: 'test-file.jpg',
  size: 1024,
  type: 'FILE',
  id: 'test-id',
  lastModified: new Date('2023-01-01T00:00:00Z'),
  eTag: 'test-etag',
  versionId: 'test-version',
};

describe('FilePreviewLayout', () => {
  it('renders file preview title', () => {
    render(
      <FilePreviewLayout fileData={mockFileData}>
        <div>Test Content</div>
      </FilePreviewLayout>
    );

    expect(screen.getByText('File Preview')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <FilePreviewLayout fileData={mockFileData}>
        <div>Custom Preview Content</div>
      </FilePreviewLayout>
    );

    expect(screen.getByText('Custom Preview Content')).toBeInTheDocument();
  });

  it('renders file metadata section', () => {
    render(
      <FilePreviewLayout fileData={mockFileData}>
        <div>Test Content</div>
      </FilePreviewLayout>
    );

    expect(screen.getByText('File Information')).toBeInTheDocument();
    expect(screen.getByText('test-file.jpg')).toBeInTheDocument();
    expect(screen.getByText('1.0 kB')).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = render(
      <FilePreviewLayout fileData={mockFileData}>
        <div>Test Content</div>
      </FilePreviewLayout>
    );

    expect(
      container.querySelector('.amplify-storage-browser__file-preview-section')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.amplify-storage-browser__file-preview-title')
    ).toBeInTheDocument();
  });
});
