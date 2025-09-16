import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { FilePreviewProps } from '../FilePreview';
import { FilePreview } from '../FilePreview';
import type { FileData } from '../../../actions';

jest.mock('../../../filePreview/context', () => ({
  useFilePreviewContext: () => ({
    rendererResolver: undefined,
  }),
}));

jest.mock('../../../useAction', () => ({
  useAction: () => [{ isProcessing: false }, jest.fn()],
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
  activeFile: mockFileData,
  filePreview: {
    enabled: false,
  },
  onSelectActiveFile: jest.fn(),
  onRetryFilePreview: jest.fn(),
};

const getProps = (pp: Partial<FilePreviewProps>): FilePreviewProps => {
  return {
    ...defaultProps,
    ...pp,
  };
};

describe('FilePreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when no previewed file', () => {
    const { container } = render(<FilePreview {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: true,
          },
        })}
      />
    );
    expect(document.querySelector('.amplify-placeholder')).toBeInTheDocument();
  });

  it('renders error state with retry button', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: false,
            error: 'GENERIC_ERROR',
          },
        })}
      />
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(defaultProps.onRetryFilePreview).toHaveBeenCalled();
  });

  it('renders limit exceeded state', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: false,
            error: 'LIMIT_EXCEEDED',
          },
        })}
      />
    );
    expect(
      screen.getByText('File preview not possible due to preview size limit')
    ).toBeInTheDocument();
  });

  it('renders image preview for image files', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: true,
            fileData: mockFileData,
            url: 'https://example.com/file.jpg',
          },
        })}
      />
    );

    expect(screen.getByText('File Preview')).toBeInTheDocument();
    expect(
      screen.getByAltText('Image preview for test.jpg')
    ).toBeInTheDocument();
    expect(screen.getByText('File Information')).toBeInTheDocument();
  });

  it('renders video preview for video files', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: true,
            fileData: { ...mockFileData, fileType: 'video' },
            url: 'https://example.com/file.jpg',
          },
        })}
      />
    );
    expect(
      screen.getByLabelText('Video preview for test.jpg')
    ).toBeInTheDocument();
  });

  it('renders text preview for text files', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: true,
            fileData: { ...mockFileData, fileType: 'text' },
            url: 'https://example.com/file.jpg',
          },
        })}
      />
    );
    expect(screen.getByText('fetch is not defined')).toBeInTheDocument();
  });

  it('renders fallback for unsupported file types', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: true,
            fileData: { ...mockFileData, fileType: null },
            url: 'https://example.com/file.jpg',
          },
        })}
      />
    );
    expect(
      screen.getByText('This file type is not supported for preview.')
    ).toBeInTheDocument();
  });

  it('calls onCloseFilePreview when close button is clicked', () => {
    render(
      <FilePreview
        {...getProps({
          filePreview: {
            ...defaultProps.filePreview,
            enabled: true,
            isLoading: false,
            ok: true,
            fileData: mockFileData,
            url: 'https://example.com/file.jpg',
          },
        })}
      />
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.onSelectActiveFile).toHaveBeenCalled();
  });
});
