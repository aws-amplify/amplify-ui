import { createTheme, defaultTheme } from '@aws-amplify/ui';
import * as React from 'react';
import { useTheme } from '../useTheme';

jest.mock('react');

describe('useTheme', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return a theme object', () => {
    const customTheme = createTheme({
      name: 'my-theme',
      tokens: {
        colors: {
          font: {
            primary: { value: 'red' },
          },
        },
      },
    });

    (React.useContext as jest.Mock).mockReturnValue({ theme: customTheme });

    const theme = useTheme();

    expect(theme).toBe(customTheme);
  });

  it('should return a default theme if context is not available', () => {
    (React.useContext as jest.Mock).mockReturnValue(undefined);

    const theme = useTheme();

    expect(theme).toBe(defaultTheme);
  });

  it('should return a default theme if context.theme is undefined', () => {
    (React.useContext as jest.Mock).mockReturnValue({
      theme: undefined,
    });

    const theme = useTheme();

    expect(theme).toBe(defaultTheme);
  });
});
