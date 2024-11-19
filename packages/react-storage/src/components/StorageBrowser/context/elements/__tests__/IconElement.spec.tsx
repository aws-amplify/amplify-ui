import React from 'react';
import { render } from '@testing-library/react';
import {
  IconElement,
  StorageBrowserIconType,
  STORAGE_BROWSER_ICON_PATHS,
} from '../IconElement';

describe('IconElement', () => {
  it('should render icon', () => {
    const { container } = render(<IconElement />);

    expect(container).toBeInTheDocument();
  });

  it('should apply default icon attributes', () => {
    const { container } = render(<IconElement />);

    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('viewBox', '0 -960 960 960');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it.each(Object.entries(STORAGE_BROWSER_ICON_PATHS))(
    'should render correct path for a %s `Icon` variant',
    (variant, expectedPath) => {
      const { container } = render(
        <IconElement variant={variant as StorageBrowserIconType} />
      );

      const path = container.querySelector('path');

      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('d', expectedPath);
    }
  );

  it('should handle missing variant', () => {
    const { container } = render(<IconElement />);

    const path = container.querySelector('path');

    expect(path).not.toBeInTheDocument();
  });
});
