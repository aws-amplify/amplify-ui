import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentClassName } from '@aws-amplify/ui';
import { ImagePreview } from '../ImagePreview';

describe('ImagePreview', () => {
  const mockProps = {
    url: 'https://example.com/image.jpg',
    fileKey: 'test-image.jpg',
  };

  it('renders image with correct props', () => {
    render(<ImagePreview {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.url);
    expect(image).toHaveAttribute('alt', mockProps.fileKey);
    expect(image).toHaveClass(ComponentClassName.StorageImage);
  });

  it('renders with null url', () => {
    render(<ImagePreview url={null} fileKey={mockProps.fileKey} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockProps.fileKey);
  });
});
