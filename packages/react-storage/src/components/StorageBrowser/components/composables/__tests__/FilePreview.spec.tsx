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
  closeFilePreview: jest.fn(),
  retryFilePreview: jest.fn(),
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
    expect(defaultProps.retryFilePreview).toHaveBeenCalled();
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
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('File Information')).toBeInTheDocument();
  });

  it('renders video preview for video files', () => {
    const videoProps = {
      ...defaultProps,
      previewedFile: { ...mockFileData, fileType: 'video' as const },
    };

    render(<FilePreview {...videoProps} />);
    expect(screen.getByLabelText('test.jpg')).toBeInTheDocument();
  });

  it('renders text preview for text files', () => {
    const textProps = {
      ...defaultProps,
      previewedFile: { ...mockFileData, fileType: 'text' as const },
    };

    render(<FilePreview {...textProps} />);
    expect(screen.getByText(/Error loading file/)).toBeInTheDocument();
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

  it('calls closeFilePreview when close button is clicked', () => {
    render(<FilePreview {...defaultProps} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.closeFilePreview).toHaveBeenCalled();
  });
});
