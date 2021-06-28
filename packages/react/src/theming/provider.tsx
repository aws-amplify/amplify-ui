import React from "react";
import { ThemeContext } from "./context";
import { Theme, ThemeContextType, ThemeOptions } from "./types";
import { getCSSVariables } from "./utils";

export type ThemeProviderProps = {
  as?: keyof JSX.IntrinsicElements;
  theme?: Theme;
} & ThemeOptions;

/**
 * Provides a theme context for descending components
 * Also injects scoped CSS variables to contents.
 *
 * @param theme A Theme object describing design tokens
 * @param cssPrefix Prefix for injected CSS variables
 * @param as HTML tagname used for internal container
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  as: tag = "div",
  cssPrefix = "amplify-ui",
  children,
  theme,
}) => {
  const ref = React.useRef<HTMLElement>(null);
  const container = React.createElement(tag, { ref }, children);

  // Update styles only when theme or prefix changes
  React.useEffect(() => {
    if (ref.current && theme) {
      const variables = getCSSVariables(theme, { cssPrefix });

      // Apply CSS variables to wrapper
      variables.forEach((value, name) =>
        ref.current.style.setProperty(name, value)
      );
    }
  }, [theme, cssPrefix]);

  const context: ThemeContextType = {
    theme,
    options: { cssPrefix },
  };

  return (
    <ThemeContext.Provider value={context}>{container}</ThemeContext.Provider>
  );
};

/**
 * Wraps a component within a <ThemeProvider>
 */
export const withTheme = (
  children: React.ReactNode,
  theme?: Theme,
  options?: ThemeOptions
) => (
  <ThemeProvider theme={theme} {...options}>
    {children}
  </ThemeProvider>
);
