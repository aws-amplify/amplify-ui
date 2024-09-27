import { render } from '@testing-library/react';
import * as React from 'react';

import { GlobalStyle } from '../GlobalStyle';

describe('GlobalStyle', () => {
  it('does not render anything if no theme is passed', async () => {
    // @ts-expect-error - missing props
    const { container } = render(<GlobalStyle />);

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBe(null);
  });

  it('renders a style tag if styles are passed', async () => {
    const { container } = render(
      <GlobalStyle
        styles={{
          '.foo': {
            backgroundColor: 'red',
          },
        }}
      />
    );

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBeInTheDocument();
  });
});
