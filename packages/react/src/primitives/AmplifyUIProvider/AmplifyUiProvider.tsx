import React from "react";
import {
  ChakraProvider,
  ThemeProvider,
  toCSSVar,
  useTheme
} from "@chakra-ui/react";
import { amplifyTheme } from "../shared/amplifyTheme";
import { AMPLIFY_UI_PROVIDER } from "../shared/constants";

export const AmplifyUIProvider: React.FC<{ customTheme?: {} }> = ({
  children,
  customTheme
}) => {
  const theme = customTheme ?? amplifyTheme;
  return (
    <div className={AMPLIFY_UI_PROVIDER}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </div>
  );
};
