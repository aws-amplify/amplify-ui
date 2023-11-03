import React from 'react';
import { render } from '@testing-library/react';

import { ThemeContext } from '../ThemeContext';
import { WebTheme } from '@aws-amplify/ui';

describe('ThemeContext', () => {
  it('should provide default context values', () => {
    let context;

    const TestComponent = () => {
      context = React.useContext(ThemeContext);
      return null;
    };

    render(<TestComponent />);

    expect(context.theme.name).toBe('default-theme');
    expect(JSON.stringify(context.theme.tokens)).toBeDefined();
  });

  it('should provide context values from a provider', () => {
    let context;

    const customTheme = {
      name: 'custom',
      cssText: '',
      tokens: {},
    } as WebTheme;

    const customContextValues = {
      theme: customTheme,
    };

    const TestComponent = () => {
      context = React.useContext(ThemeContext);
      return null;
    };

    render(
      <ThemeContext.Provider value={customContextValues}>
        <TestComponent />
      </ThemeContext.Provider>
    );

    expect(context.theme.name).toBe('custom');
    expect(JSON.stringify(context.theme.tokens)).toBe('{}');
  });
});
