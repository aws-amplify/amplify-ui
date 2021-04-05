import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Amplify } from "aws-amplify";
import {
  AmplifyProvider,
  Authenticator,
  Button,
  Heading,
  theme,
} from "@aws-amplify/ui-react-native";

Amplify.configure({
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AmplifyProvider theme={theme}>
        <Authenticator>
          {({ state, send }) => (
            <View>
              <Heading>Welcome {state.context.user.username}!</Heading>
              <Button
                className="px-2 bg-white rounded shadow"
                disabled={state.matches("signOut")}
                onClick={() => send("SIGN_OUT")}
              >
                Sign Out
              </Button>
            </View>
          )}
        </Authenticator>
      </AmplifyProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
