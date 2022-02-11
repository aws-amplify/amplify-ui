import * as React from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { createTheme, defaultTheme, Theme as UiTheme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';

export type Theme = UiTheme;
export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
  // Should this theme be scoped to its part of the DOM
  // This is useful if you just want part of an application to get a different theme
  scoped?: boolean;
}

export function AmplifyProvider({
  children,
  colorMode,
  theme = defaultTheme,
  scoped = false,
}: AmplifyProviderProps) {
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;
  let props = {};

  if (scoped) {
    props = {
      'data-amplify-theme': name,
      'data-amplify-color-mode': colorMode,
    };
  } else {
    React.useEffect(() => {
      if (document && document.documentElement) {
        document.documentElement.setAttribute('data-amplify-theme', name);
        document.documentElement.setAttribute(
          'data-amplify-color-mode',
          colorMode
        );
      }
    }, [theme, colorMode]);
  }

  return (
    <AmplifyContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      <IdProvider>
        <div {...props}>{children}</div>
        <style
          id={`amplify-theme-${name}`}
          dangerouslySetInnerHTML={{ __html: cssText }}
        />
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
