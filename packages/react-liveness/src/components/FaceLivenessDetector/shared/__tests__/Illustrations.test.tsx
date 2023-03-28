import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { GoodFitIllustration, TooFarIllustration } from '../';

describe('GoodFitIllustration', () => {
  const titleText = 'Accessible text for GoodFitIllustration';
  it('should render the title text correctly', () => {
    render(<GoodFitIllustration title={titleText} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });
});

describe('TooFarIllustration', () => {
  const titleText = 'Accessible text for TooFarIllustration';
  it('should render the title text correctly', () => {
    render(<TooFarIllustration title={titleText} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });
});
