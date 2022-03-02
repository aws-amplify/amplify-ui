import * as React from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { createTheme, Theme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';

export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
}

export function AmplifyProvider({
  children,
  colorMode,
  theme,
}: AmplifyProviderProps) {
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;

  React.useEffect(() => {
    if (document && document.documentElement) {
      const originalName =
        document.documentElement.getAttribute('data-amplify-theme');
      const originalColorMode = document.documentElement.getAttribute(
        'data-amplify-color-mode'
      );
      document.documentElement.setAttribute('data-amplify-theme', name);
      document.documentElement.setAttribute(
        'data-amplify-color-mode',
        colorMode || ''
      );

      return function cleanup() {
        document.documentElement.setAttribute(
          'data-amplify-theme',
          originalName
        );
        document.documentElement.setAttribute(
          'data-amplify-color-mode',
          originalColorMode
        );
      };
    }
  }, [name, colorMode]);
  return (
    <AmplifyContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      <IdProvider>
        <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
          {children}
        </div>
        {typeof theme === 'undefined' ? null : (
          <style
            id={`amplify-theme-${name}`}
            dangerouslySetInnerHTML={{ __html: cssText }}
          />
        )}
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
