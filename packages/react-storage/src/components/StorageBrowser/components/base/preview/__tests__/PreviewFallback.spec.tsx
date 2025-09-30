import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PreviewFallback } from '../PreviewFallback';

jest.mock('../../../../useAction', () => ({
  useAction: () => [{ isProcessing: false }, jest.fn()],
}));

jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    LocationDetailView: {
      filePreview: {
        errorDescription:
          'We encountered an issue while loading the file preview.',
        unsupportedFileDescription:
          'This file type is not supported for preview.',
        filePrefix: 'File: ',
        retryButtonLabel: 'Retry',
        downloadButtonLabel: 'Download',
      },
    },
  }),
}));

describe('PreviewFallback', () => {
  const defaultProps = {
    fileKey: 'path/to/test-file.pdf',
    message: 'File preview not supported',
  };

  it('renders fallback message for unsupported files', () => {
    render(<PreviewFallback {...defaultProps} />);

    expect(screen.getByText('File preview not supported')).toBeInTheDocument();
    expect(
      screen.getByText('This file type is not supported for preview.')
    ).toBeInTheDocument();
    expect(screen.getByText('File: test-file.pdf')).toBeInTheDocument();
  });

  it('renders error state with different styling', () => {
    render(<PreviewFallback {...defaultProps} isError />);

    expect(
      screen.getByText(
        'We encountered an issue while loading the file preview.'
      )
    ).toBeInTheDocument();
  });

  it('shows retry button when showRetry is true', () => {
    const onRetry = jest.fn();
    render(<PreviewFallback {...defaultProps} showRetry onRetry={onRetry} />);

    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows download button by default', () => {
    render(<PreviewFallback {...defaultProps} />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('does not show retry button when onRetry is not provided', () => {
    render(<PreviewFallback {...defaultProps} showRetry />);
    expect(screen.queryByText('Retry')).not.toBeInTheDocument();
  });
});
