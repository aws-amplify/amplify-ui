import React from 'react';
import { render, screen } from '@testing-library/react';
import { VideoPreview } from '../VideoPreview';

describe('VideoPreview', () => {
  const mockProps = {
    url: 'https://example.com/video.mp4',
    fileKey: 'test-video.mp4',
  };

  it('renders video element with correct attributes', () => {
    render(<VideoPreview {...mockProps} />);

    const video = screen.getByLabelText(mockProps.fileKey);
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(video).toHaveAttribute('aria-label', mockProps.fileKey);

    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', mockProps.url);
  });

  it('renders with null url', () => {
    render(<VideoPreview url={null} fileKey={mockProps.fileKey} />);

    const video = screen.getByLabelText(mockProps.fileKey);
    expect(video).toHaveAttribute('aria-label', mockProps.fileKey);
  });
});
