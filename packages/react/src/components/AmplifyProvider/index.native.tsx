import * as React from "react";
import { View } from "react-native";
import { AmplifyContext } from "./AmplifyContext";

export function AmplifyProvider({
  children,
  components = undefined,
  theme = undefined,
}) {
  return (
    <AmplifyContext.Provider value={{ components, theme }}>
      <View data-amplify-theme="">{children}</View>
    </AmplifyContext.Provider>
  );
}
