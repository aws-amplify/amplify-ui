import { render } from '@testing-library/react';
import * as React from 'react';

import { ThemeStyle } from '../ThemeStyle';
import { createTheme } from '@aws-amplify/ui';

describe('ThemeStyle', () => {
  it('does not render anything if no theme is passed', async () => {
    const { container } = render(<ThemeStyle />);

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBe(null);
  });

  it('renders a style tag with the theme', async () => {
    const { container } = render(<ThemeStyle theme={createTheme()} />);

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBeDefined();
  });
});
