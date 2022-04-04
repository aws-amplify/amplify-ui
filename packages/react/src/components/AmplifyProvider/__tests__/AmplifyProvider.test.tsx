import { render, screen } from '@testing-library/react';

import { AmplifyProvider } from '../index';
import { Heading } from '../../../primitives';
import { Theme } from '@aws-amplify/ui-react';

const App = () => {
  return <Heading>Howdy</Heading>;
};

describe('AmplifyProvider', () => {
  it('does not require props', async () => {
    render(
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    );

    const heading = await screen.getByText('Howdy');
    expect(heading.nodeName).toBe('H6');
  });

  it('wraps the App in [data-amplify-theme="default-theme"]', () => {
    spyOn(global.document.documentElement, 'setAttribute');
    const { container } = render(
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    );

    expect(global.document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-amplify-theme',
      'default-theme'
    );

    expect(global.document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-amplify-color-mode',
      ''
    );
  });

  it('sanitizes the theme CSS before injecting it into the DOM via dangerouslySetInnerHTML', async () => {
    const name = 'dirtyTheme';
    const xss = `<script>alert('XSS')</script>`;
    const dirtyTheme: Theme = {
      name,
      tokens: {
        colors: {
          font: { primary: { value: 'pink' }, secondary: { value: xss } },
        },
      },
    };

    const { container } = render(
      <AmplifyProvider theme={dirtyTheme}>
        <App />
      </AmplifyProvider>
    );

    const styleTag = container.querySelector(`#amplify-theme-${name}`);
    expect(styleTag).toHaveTextContent('--amplify-colors-font-primary: pink;');
    expect(styleTag).toHaveTextContent('--amplify-colors-font-secondary: ;');
    expect(styleTag).not.toHaveTextContent(
      `--amplify-colors-font-secondary: <script>alert('XSS')</script>;`
    );
  });
});
