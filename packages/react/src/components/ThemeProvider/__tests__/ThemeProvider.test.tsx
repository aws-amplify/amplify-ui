import { render, screen } from '@testing-library/react';
import { Theme } from '@aws-amplify/ui';

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
    spyOn(global.document.documentElement, 'setAttribute');
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    expect(global.document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-amplify-theme',
      'default-theme'
    );

    expect(global.document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-amplify-color-mode',
      undefined
    );
  });

  it('should not set attributes on root element if isNested is ture', () => {
    spyOn(global.document.documentElement, 'setAttribute');
    render(
      <ThemeProvider isNested>
        <App />
      </ThemeProvider>
    );

    expect(global.document.documentElement.setAttribute).not.toHaveBeenCalled();
    expect(global.document.documentElement.setAttribute).not.toHaveBeenCalled();
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
