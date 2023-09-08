import React from 'react';
import { render } from '@testing-library/react';

import { AmplifyContext } from '../AmplifyContext';
import { WebTheme } from '@aws-amplify/ui';

describe('AmplifyContext', () => {
  it('should provide default context values', () => {
    let amplifyContext;

    const TestComponent = () => {
      amplifyContext = React.useContext(AmplifyContext);
      return null;
    };

    render(<TestComponent />);

    expect(amplifyContext.theme.name).toBe('default-theme');
    expect(JSON.stringify(amplifyContext.theme.tokens)).toBeDefined();
  });

  it('should provide context values from a provider', () => {
    let amplifyContext;

    const customTheme = {
      name: 'custom',
      cssText: '',
      tokens: {},
    } as WebTheme;

    const customContextValues = {
      theme: customTheme,
    };

    const TestComponent = () => {
      amplifyContext = React.useContext(AmplifyContext);
      return null;
    };

    render(
      <AmplifyContext.Provider value={customContextValues}>
        <TestComponent />
      </AmplifyContext.Provider>
    );

    expect(amplifyContext.theme.name).toBe('custom');
    expect(JSON.stringify(amplifyContext.theme.tokens)).toBe('{}');
  });
});
