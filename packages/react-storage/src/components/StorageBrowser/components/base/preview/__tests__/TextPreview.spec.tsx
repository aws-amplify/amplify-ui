import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TextPreview } from '../TextPreview';

const mockFetch = jest.fn();
global.fetch = mockFetch;

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
    render(<TextPreview {...mockProps} />);

    expect(screen.getByText('Loading file content...')).toBeInTheDocument();
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
      expect(
        screen.getByText('Error loading file: Network error')
      ).toBeInTheDocument();
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
        screen.getByText('Error loading file: Failed to fetch file: Not Found')
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
    render(<TextPreview url={null} fileKey={mockProps.fileKey} />);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('handles fetch error in useEffect', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<TextPreview {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByText('Error loading file: Network error')
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
