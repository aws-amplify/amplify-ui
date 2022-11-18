import { render, screen } from '@testing-library/react';
import { Theme } from '@aws-amplify/ui';
import * as React from 'react';

import { ThemeProvider } from '../index';
import { Heading } from '../../../primitives';

const App = () => {
  return <Heading>Howdy</Heading>;
};

describe('ThemeProvider', () => {
  it('does not require props', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const heading = await screen.getByText('Howdy');
    expect(heading.nodeName).toBe('H6');
  });

  it('wraps the App in [data-amplify-theme="default-theme"]', () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    expect(container.querySelector(`[data-amplify-theme]`)).toHaveAttribute(
      'data-amplify-theme',
      'default-theme'
    );
  });

  it('takes direction prop and sets dir', () => {
    const { debug, container } = render(
      <ThemeProvider direction="rtl">
        <App />
      </ThemeProvider>
    );

    expect(container.querySelector(`[data-amplify-theme]`)).toHaveAttribute(
      'dir',
      'rtl'
    );
  });

  it('takes the colorMode prop and sets [data-amplify-color-mode]', () => {
    const { debug, container } = render(
      <ThemeProvider colorMode="light">
        <App />
      </ThemeProvider>
    );

    expect(container.querySelector(`[data-amplify-theme]`)).toHaveAttribute(
      'data-amplify-color-mode',
      'light'
    );
  });

  it('filters out XSS attacks which attempt to escape the CSS context', async () => {
    const name = 'maliciousTheme';
    const xss = `</style><script>alert('XSS')</script>`;
    const maliciousTheme: Theme = {
      name,
      tokens: {
        colors: {
          font: { primary: { value: 'pink' }, secondary: { value: xss } },
        },
      },
    };

    const { container } = render(
      <ThemeProvider theme={maliciousTheme}>
        <App />
      </ThemeProvider>
    );

    const styleTag = container.querySelector(`#amplify-theme-${name}`);
    expect(styleTag).toBe(null);
  });

  it('filters out XSS attacks which attempt to escape the CSS context using whitespace characters', async () => {
    const name = 'maliciousTheme';
    const xss = `</style
    ><script>alert('XSS')</script>`;
    const maliciousTheme: Theme = {
      name,
      tokens: {
        colors: {
          font: { primary: { value: 'pink' }, secondary: { value: xss } },
        },
      },
    };

    const { container } = render(
      <ThemeProvider theme={maliciousTheme}>
        <App />
      </ThemeProvider>
    );

    const styleTag = container.querySelector(`#amplify-theme-${name}`);
    expect(styleTag).toBe(null);
  });
});
