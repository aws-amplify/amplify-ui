import * as React from 'react';
import { renderHook } from '@testing-library/react-native';
import { ThemeProvider } from '../../ThemeProvider';

import { createReactNativeTheme, ReactNativeTheme } from '../../theme';
import { useTheme } from '../useTheme';

const serializeTheme = (theme: ReactNativeTheme) =>
  JSON.stringify(theme, null, 2);

describe('useTheme', () => {
  it('should return a theme object when provided through theme', () => {
    const customTheme = {
      name: 'my-theme',
      tokens: {
        colors: {
          brand: {
            primary: {
              10: 'red',
            },
          },
        },
      },
    };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
      ),
    });

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createReactNativeTheme(customTheme))
    );
  });

  it('should return a default theme if not provided through context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createReactNativeTheme())
    );
  });

  it('should return a default theme when there is no context', () => {
    const { result } = renderHook(() => useTheme());

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createReactNativeTheme())
    );
  });
});
