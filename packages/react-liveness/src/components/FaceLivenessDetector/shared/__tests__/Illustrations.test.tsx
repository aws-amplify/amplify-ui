import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { GoodFitIllustration, TooFarIllustration } from '../';

describe('GoodFitIllustration', () => {
  const titleText = 'Accessible text for GoodFitIllustration';
  const testId = 'goodFitIllustration';
  it('should render the svg correctly', async () => {
    render(<GoodFitIllustration testId={testId} title={titleText} />);
    const svg = await screen.findByTestId(testId);
    expect(svg.nodeName).toBe('svg');
    expect(svg.getAttribute('width')).toBe('150');
    expect(svg.getAttribute('height')).toBe('150');
    expect(screen.getByTitle(titleText)).toBeInTheDocument();
  });
});

describe('TooFarIllustration', () => {
  const titleText = 'Accessible text for TooFarIllustration';
  const testId = 'tooFarIllustration';
  it('should render the svg correctly', async () => {
    render(<TooFarIllustration testId={testId} title={titleText} />);
    const svg = await screen.findByTestId(testId);
    expect(svg.nodeName).toBe('svg');
    expect(svg.getAttribute('width')).toBe('150');
    expect(svg.getAttribute('height')).toBe('150');
    expect(screen.getByTitle(titleText)).toBeInTheDocument();
  });
});
