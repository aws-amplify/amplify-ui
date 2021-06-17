import React from "react";
import { useTheme, ThemeProvider } from "@emotion/react";
import { toCSSVar } from "@chakra-ui/react";
import { amplifyTheme } from "../shared/amplifyTheme";

export const AmplifyUI = ({ children, theme = amplifyTheme }) => {
  const computedTheme = React.useMemo(() => toCSSVar(theme), [theme]);
  const computedButtonTheme = React.useMemo(
    () => toCSSVar(theme.components.Button),
    [theme]
  );

  return (
    <div style={computedTheme.__cssVars}>
      <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>
    </div>
  );
};

export const AmplifyComponent = ({ children }) => {
  const theme = useTheme();

  // If component already lives within a ThemeContext, don't wrap it
  if ("config" in theme) {
    return children;
  }

  return <AmplifyUI>{children}</AmplifyUI>;
};
