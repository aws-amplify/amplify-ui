import React from 'react';
import { render } from '@testing-library/react';
import { PreviewPlaceholder } from '../PreviewPlaceholder';

describe('PreviewPlaceholder', () => {
  it('renders placeholder structure', () => {
    const { container } = render(<PreviewPlaceholder />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
