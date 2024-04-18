import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Theme } from '../Theme';
import { createTheme } from '@aws-amplify/ui';

describe('Theme:', () => {
  const themeText = 'Hello from inside a theme';
  const theme = createTheme();

  it('renders correct defaults', async () => {
    const themeId = 'themeId';
    const themeTestId = 'themeTestId';
    render(
      <Theme theme={theme} id={themeId} testId={themeTestId}>
        {themeText}
      </Theme>
    );

    const view = await screen.findByTestId(themeTestId);
    expect(view.id).toBe(themeId);
    expect(view.nodeName).toBe('DIV');
  });

  it('should render class name', async () => {
    const className = 'class-test';
    const testId = 'theme-test';
    render(<Theme theme={theme} className={className} testId={testId} />);

    const view = await screen.findByTestId(testId);
    expect(view).toHaveClass(className);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const testId = 'theme-test';

    render(<Theme theme={theme} ref={ref} testId={testId} />);

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Theme theme={theme} data-demo="true" testId="dataTest">
        {themeText}
      </Theme>
    );
    const view = await screen.findByTestId('dataTest');
    expect(view.dataset['demo']).toBe('true');
  });

  it('should have default colorMode of "system"', async () => {
    const testId = 'test-id';
    render(<Theme theme={theme} testId={testId} />);
    const view = await screen.findByTestId(testId);
    expect(view.getAttribute('data-amplify-color-mode')).toBe('system');
  });

  it('should add the theme name to the data-amplify-theme attribute', async () => {
    const testId = 'test-id';
    render(<Theme theme={theme} testId={testId} />);
    const view = await screen.findByTestId(testId);
    expect(view.getAttribute('data-amplify-theme')).toBe(theme.name);
  });
});
