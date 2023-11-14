import { createTheme, WebTheme } from '@aws-amplify/ui';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeProvider } from '../../components/ThemeProvider';
import { useTheme } from '../useTheme';
import * as React from 'react';

const serializeTheme = (theme: WebTheme) => JSON.stringify(theme, null, 2);

describe('useTheme', () => {
  it('should return a theme object when provided through theme', () => {
    const customTheme = {
      name: 'my-theme',
      tokens: {
        colors: {
          font: {
            primary: { value: 'a very custom value for this theme' },
          },
        },
      },
    };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
      ),
    });

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createTheme(customTheme))
    );
  });

  it('extends the theme passed to `ThemeProvider`', () => {
    const studioTheme = createTheme();
    const extendedTheme = createTheme(
      {
        name: 'extended-theme',
        tokens: {
          colors: {
            font: {
              primary: { value: 'hotpink' },
            },
          },
        },
      },
      studioTheme
    );

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <ThemeProvider theme={extendedTheme}>{children}</ThemeProvider>
      ),
    });

    expect(result.current.tokens.colors.font.primary.value).toBe('hotpink');
  });

  it('should return a default theme if not provided through context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      ),
    });

    expect(serializeTheme(result.current)).toBe(serializeTheme(createTheme()));
  });

  it('should return a default theme when there is no context', () => {
    const { result } = renderHook(() => useTheme());

    expect(serializeTheme(result.current)).toBe(serializeTheme(createTheme()));
  });
});
