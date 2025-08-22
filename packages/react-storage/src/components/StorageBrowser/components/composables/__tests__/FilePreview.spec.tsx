import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilePreview } from '../FilePreview';
import type { FilePreviewProps } from '../FilePreview';
import type { FileData } from '../../../actions';

jest.mock('../../../filePreview/context', () => ({
  useFilePreviewContext: () => ({
    rendererResolver: undefined,
  }),
}));

jest.mock('../../../useAction', () => ({
  useAction: () => [null, jest.fn()],
}));

jest.mock('../../../displayText', () => ({
  useDisplayText: () => ({
    LocationDetailView: {
      filePreview: {
        closeButtonLabel: 'Close',
        filePreviewTitle: 'File Preview',
        fileInformationTitle: 'File Information',
        errorMessage: 'Something went wrong',
        sizeLimitMessage: 'File preview not possible due to preview size limit',
        keyLabel: 'Key',
        sizeLabel: 'Size',
        versionIdLabel: 'Version Id',
        lastModifiedLabel: 'Last Modified',
        entityTagLabel: 'Entity tag',
        typeLabel: 'Type',
        unknownValue: 'Unknown',
        errorDescription:
          'We encountered an issue while loading the file preview.',
        unsupportedFileDescription:
          'This file type is not supported for preview.',
        filePrefix: 'File: ',
        retryButtonLabel: 'Retry',
        downloadButtonLabel: 'Download',
        loadingTextContent: 'Loading file content...',
        getTextErrorMessage: (error: string) => `Error loading file: ${error}`,
        emptyFileMessage: 'File is empty',
      },
    },
  }),
}));

const mockFileData: FileData = {
  key: 'test.jpg',
  size: 1024,
  type: 'FILE',
  id: 'test-id',
  fileType: 'image',
  lastModified: new Date(),
};

const defaultProps: FilePreviewProps = {
  isLoading: false,
  hasError: false,
  previewedFile: mockFileData,
  url: 'https://example.com/test.jpg',
  hasLimitExceeded: false,
  onCloseFilePreview: jest.fn(),
  onRetryFilePreview: jest.fn(),
};

describe('FilePreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when no previewed file', () => {
    const { container } = render(
      <FilePreview {...defaultProps} previewedFile={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state', () => {
    render(<FilePreview {...defaultProps} isLoading />);
    expect(document.querySelector('.amplify-placeholder')).toBeInTheDocument();
  });

  it('renders error state with retry button', () => {
    render(<FilePreview {...defaultProps} hasError />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(defaultProps.onRetryFilePreview).toHaveBeenCalled();
  });

  it('renders limit exceeded state', () => {
    render(<FilePreview {...defaultProps} hasLimitExceeded />);
    expect(
      screen.getByText('File preview not possible due to preview size limit')
    ).toBeInTheDocument();
  });

  it('renders image preview for image files', () => {
    render(<FilePreview {...defaultProps} />);

    expect(screen.getByText('File Preview')).toBeInTheDocument();
    expect(
      screen.getByAltText('Image preview for test.jpg')
    ).toBeInTheDocument();
    expect(screen.getByText('File Information')).toBeInTheDocument();
  });

  it('renders video preview for video files', () => {
    const videoProps = {
      ...defaultProps,
      previewedFile: { ...mockFileData, fileType: 'video' as const },
    };

    render(<FilePreview {...videoProps} />);
    expect(
      screen.getByLabelText('Video preview for test.jpg')
    ).toBeInTheDocument();
  });

  it('renders text preview for text files', () => {
    const textProps = {
      ...defaultProps,
      previewedFile: { ...mockFileData, fileType: 'text' as const },
    };

    render(<FilePreview {...textProps} />);
    expect(screen.getByText('fetch is not defined')).toBeInTheDocument();
  });

  it('renders fallback for unsupported file types', () => {
    const unsupportedProps = {
      ...defaultProps,
      previewedFile: { ...mockFileData, fileType: null },
    };

    render(<FilePreview {...unsupportedProps} />);
    expect(
      screen.getByText('File preview not supported for this file type')
    ).toBeInTheDocument();
  });

  it('calls onCloseFilePreview when close button is clicked', () => {
    render(<FilePreview {...defaultProps} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.onCloseFilePreview).toHaveBeenCalled();
  });
});
