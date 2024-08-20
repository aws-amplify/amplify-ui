import React from 'react';
import { render } from '@testing-library/react';
import {
  IconElement,
  DEFAULT_ICON_PATHS,
  DEFAULT_ICON_ATTRIBUTES,
} from '../IconElement';
import { FederatedProvider } from '@aws-amplify/ui';

describe('IconElement', () => {
  it('should render icon', () => {
    const { container } = render(<IconElement />);

    expect(container).toBeInTheDocument();
  });

  it('should render Google icon with correct attributes', () => {
    const { container } = render(<IconElement variant="google" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('aria-label', 'Google icon');
    expect(svgElement).toHaveAttribute(
      'class',
      'amplify-icon federated-sign-in-icon'
    );
    expect(svgElement).toHaveAttribute('viewBox', '0 0 256 262');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('preserveAspectRatio', 'xMidYMid');
  });

  it('should render Facebook icon with correct attributes', () => {
    const { container } = render(<IconElement variant="facebook" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('aria-label', 'Facebook icon');
    expect(svgElement).toHaveAttribute('class', 'federated-sign-in-icon');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 279 538');
  });

  it('should render Apple icon with correct attributes', () => {
    const { container } = render(<IconElement variant="apple" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('aria-label', 'Apple icon');
    expect(svgElement).toHaveAttribute(
      'class',
      'amplify-icon federated-sign-in-icon'
    );
    expect(svgElement).toHaveAttribute('fill', '#000');
    expect(svgElement).toHaveAttribute('stroke', '#000');
    expect(svgElement).toHaveAttribute('stroke-width', '0');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 1024 1024');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('preserveAspectRatio', 'xMidYMid');
  });

  it('should render Amazon icon with correct attributes', () => {
    const { container } = render(<IconElement variant="amazon" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('aria-label', 'Amazon icon');
    expect(svgElement).toHaveAttribute(
      'class',
      'amplify-icon federated-sign-in-icon'
    );
    expect(svgElement).toHaveAttribute('viewBox', '0 0 243 264');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('preserveAspectRatio', 'xMidYMid');
  });

  it.each(Object.entries(DEFAULT_ICON_PATHS))(
    'should render correct paths for a %s `Icon` variant',
    (variant, expectedPaths) => {
      const { container } = render(
        <IconElement variant={variant as FederatedProvider} />
      );

      const path = container.querySelectorAll('path');

      for (let i = 0; i < path.length; i++) {
        expect(path[i]).toBeInTheDocument();
        expect(path[i]).toHaveAttribute('d', expectedPaths[i]['d']);
        expect(path[i]).toHaveAttribute('fill', expectedPaths[i]['fill']);
      }
    }
  );

  it('should handle missing variant', () => {
    const { container } = render(<IconElement />);

    const path = container.querySelector('path');

    expect(path).not.toBeInTheDocument();
  });
});
