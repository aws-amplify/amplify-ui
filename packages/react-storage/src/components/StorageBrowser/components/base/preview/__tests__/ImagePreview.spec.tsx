import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentClassName } from '@aws-amplify/ui';
import { ImagePreview } from '../ImagePreview';

describe('ImagePreview', () => {
  const mockProps = {
    url: 'https://example.com/image.jpg',
    fileKey: 'test-image.jpg',
  };

  it('renders image with correct props', () => {
    render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img', { hidden: true });
    expect(image).toHaveAttribute('src', mockProps.url);
    expect(image).toHaveAttribute('alt', mockProps.fileKey);
    expect(image).toHaveClass(ComponentClassName.StorageImage);
  });

  it('shows loading placeholder initially and hides image', () => {
    const { container } = render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img', { hidden: true });
    expect(
      container.querySelector('.amplify-storage-browser__preview-placeholder')
    ).toBeInTheDocument();
    expect(image).toHaveStyle({ display: 'none' });
  });

  it('shows image and hides placeholder when loaded', async () => {
    const { container } = render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img', { hidden: true });
    fireEvent.load(image);

    await waitFor(() => {
      expect(image).toHaveStyle({ display: 'block' });
      expect(
        container.querySelector('.amplify-storage-browser__preview-placeholder')
      ).not.toBeInTheDocument();
    });
  });

  it('displays error message when image fails to load', async () => {
    render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img', { hidden: true });
    fireEvent.error(image);

    await waitFor(() => {
      expect(screen.getByText('Image Loading Error')).toBeInTheDocument();
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
      expect(
        screen.queryByRole('img', { hidden: true })
      ).not.toBeInTheDocument();
    });
  });

  it('handles retry functionality', async () => {
    const { container } = render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img', { hidden: true });
    fireEvent.error(image);

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    });

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Failed to load image')
      ).not.toBeInTheDocument();
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
      expect(
        container.querySelector('.amplify-storage-browser__preview-placeholder')
      ).toBeInTheDocument();
    });
  });
});
