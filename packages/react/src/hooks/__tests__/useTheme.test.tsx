import { createTheme, defaultTheme, WebTheme } from '@aws-amplify/ui';
import { renderHook } from '@testing-library/react-hooks';
import { AmplifyProvider } from '../../components/AmplifyProvider';
import { useTheme } from '../useTheme';

const serializeTheme = (theme: WebTheme) => JSON.stringify(theme, null, 2);

describe('useTheme', () => {
  it('should return a theme object when provided through theme', async () => {
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
      wrapper: ({ children }) => (
        <AmplifyProvider theme={customTheme}>{children}</AmplifyProvider>
      ),
    });

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createTheme(customTheme))
    );
  });

  it('should return a default theme if not provided through context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <AmplifyProvider>{children}</AmplifyProvider>,
    });

    expect(serializeTheme(result.current)).toBe(
      serializeTheme(createTheme(defaultTheme))
    );
  });

  it('should return a default theme when there is no context', () => {
    const { result } = renderHook(() => useTheme());

    expect(serializeTheme(result.current)).toBe(serializeTheme(defaultTheme));
  });
});
