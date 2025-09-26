import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { VideoPreview } from '../VideoPreview';

const MEDIA_ERR_ABORTED = 1;
const MEDIA_ERR_NETWORK = 2;
const MEDIA_ERR_DECODE = 3;
const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

global.MediaError = {
  MEDIA_ERR_ABORTED,
  MEDIA_ERR_NETWORK,
  MEDIA_ERR_DECODE,
  MEDIA_ERR_SRC_NOT_SUPPORTED,
} as any;

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

describe('VideoPreview', () => {
  const mockProps = {
    url: 'https://example.com/video.mp4',
    fileKey: 'test-video.mp4',
  };

  it('renders video element with correct attributes', () => {
    render(<VideoPreview {...mockProps} />);

    const video = screen.getByLabelText(
      `Video preview for ${mockProps.fileKey}`
    );
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(video).toHaveAttribute(
      'aria-label',
      `Video preview for ${mockProps.fileKey}`
    );

    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', mockProps.url);
  });

  it('shows loading placeholder initially', () => {
    const { container } = render(<VideoPreview {...mockProps} />);

    expect(
      container.querySelector('.amplify-storage-browser__preview-placeholder')
    ).toBeInTheDocument();
  });

  it('hides video during loading', () => {
    const { container } = render(<VideoPreview {...mockProps} />);

    const videoContainer = container.querySelector(
      '.amplify-storage-browser__video-preview'
    );
    expect(videoContainer).toHaveStyle({ display: 'none' });
  });

  it('shows video and hides placeholder when loaded', async () => {
    const { container } = render(<VideoPreview {...mockProps} />);

    const video = screen.getByLabelText(
      `Video preview for ${mockProps.fileKey}`
    );

    fireEvent.loadedData(video);

    await waitFor(() => {
      const videoContainer = container.querySelector(
        '.amplify-storage-browser__video-preview'
      );
      expect(videoContainer).toHaveStyle({ display: 'flex' });
      expect(
        container.querySelector('.amplify-storage-browser__preview-placeholder')
      ).not.toBeInTheDocument();
    });
  });

  it('displays error message when video fails to load', async () => {
    render(<VideoPreview {...mockProps} />);

    const video = screen.getByLabelText(
      `Video preview for ${mockProps.fileKey}`
    );

    Object.defineProperty(video, 'error', {
      value: { code: MEDIA_ERR_SRC_NOT_SUPPORTED },
      writable: true,
    });

    fireEvent.error(video);

    await waitFor(() => {
      expect(
        screen.getByText('Video format is not supported')
      ).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });

  it('handles retry functionality', async () => {
    const { container } = render(<VideoPreview {...mockProps} />);

    const video = screen.getByLabelText(
      `Video preview for ${mockProps.fileKey}`
    );

    Object.defineProperty(video, 'error', {
      value: { code: MEDIA_ERR_NETWORK },
      writable: true,
    });

    fireEvent.error(video);

    await waitFor(() => {
      expect(
        screen.getByText('Network error occurred while loading video')
      ).toBeInTheDocument();
    });

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(
        container.querySelector('.amplify-storage-browser__preview-placeholder')
      ).toBeInTheDocument();
    });
  });

  it('handles different error codes correctly', async () => {
    const errorCases = [
      {
        code: MEDIA_ERR_ABORTED,
        message: 'Video loading was aborted',
      },
      {
        code: MEDIA_ERR_DECODE,
        message: 'Video format is not supported or corrupted',
      },
      { code: 999, message: 'An unknown error occurred while loading video' },
    ];

    for (const errorCase of errorCases) {
      const { rerender } = render(<VideoPreview {...mockProps} />);

      const video = screen.getByLabelText(
        `Video preview for ${mockProps.fileKey}`
      );

      Object.defineProperty(video, 'error', {
        value: { code: errorCase.code },
        writable: true,
      });

      fireEvent.error(video);

      await waitFor(() => {
        expect(screen.getByText(errorCase.message)).toBeInTheDocument();
      });

      rerender(<VideoPreview {...mockProps} />);
    }
  });
});
