import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TextPreview } from '../TextPreview';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('../../../../useAction', () => ({
  useAction: () => [null, jest.fn()],
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
        getTextErrorMessage: (error: string) => `Error loading file: ${error}`,
        emptyFileMessage: 'File is empty',
      },
    },
  }),
}));

describe('TextPreview', () => {
  const mockProps = {
    url: 'https://example.com/file.txt',
    fileKey: 'test-file.txt',
  };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('shows loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    const { container } = render(<TextPreview {...mockProps} />);

    expect(
      container.querySelector('.amplify-storage-browser__preview-placeholder')
    ).toBeInTheDocument();
  });

  it('displays text content after successful fetch', async () => {
    const mockContent = 'Hello, world!';
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockContent),
    });

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('displays error message on non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch file: Not Found')
      ).toBeInTheDocument();
    });
  });

  it('displays empty file message for empty content', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(''),
    });

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('File is empty')).toBeInTheDocument();
    });
  });

  it('does not fetch when url is null', () => {
    render(<TextPreview url={null!} fileKey={mockProps.fileKey} />);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('handles fetch error in useEffect', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
