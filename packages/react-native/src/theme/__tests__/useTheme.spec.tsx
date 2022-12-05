import * as React from 'react';
import { renderHook } from '@testing-library/react-native';
import { ThemeProvider } from '../ThemeProvider';

import { createTheme } from '../createTheme';
import { useTheme } from '../useTheme';

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

    expect(result.current).toStrictEqual(createTheme(customTheme));
  });

  it('should return a default theme if not provided through context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current).toStrictEqual(createTheme());
  });

  it('should return a default theme when there is no context', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current).toStrictEqual(createTheme());
  });

  it('should output the base tokens as expected', () => {
    const { result } = renderHook(useTheme);

    expect(result.current.tokens).toMatchSnapshot();
  });
});
