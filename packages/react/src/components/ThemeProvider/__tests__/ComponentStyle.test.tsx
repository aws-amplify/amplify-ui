import { render } from '@testing-library/react';
import * as React from 'react';

import { ComponentStyle } from '../ComponentStyle';
import { createTheme, defineComponentTheme } from '@aws-amplify/ui';

describe('ComponentStyle', () => {
  it('does not render anything if no theme is passed', async () => {
    // @ts-expect-error - missing props
    const { container } = render(<ComponentStyle />);

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBe(null);
  });

  it('does not render anything if no component themes are passed', async () => {
    // @ts-expect-error - missing props
    const { container } = render(<ComponentStyle theme={createTheme()} />);

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBe(null);
  });

  it('renders a style tag if theme and component themes are passed', async () => {
    const testComponentTheme = defineComponentTheme({
      name: 'test',
      theme(tokens) {
        return {
          color: tokens.colors.red[100],
        };
      },
    });
    const { container } = render(
      <ComponentStyle
        theme={createTheme()}
        componentThemes={[testComponentTheme]}
      />
    );

    const styleTag = container.querySelector(`style`);
    expect(styleTag).toBeInTheDocument();
  });
});
