import React, { ReactNode } from 'react';
import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Authenticator,
  useAuthenticator,
  defaultDarkModeOverride,
  ThemeProvider,
  Theme,
  useTheme,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const MyHeader = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const {
    tokens: { colors, fontSizes },
  } = useTheme();
  return (
    <View style={style}>
      <Text
        style={{ fontSize: fontSizes.xxl, color: colors.brand.primary[80] }}
      >
        {children}
      </Text>
    </View>
  );
};

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

const theme: Theme = {
  overrides: [defaultDarkModeOverride],
};

function App() {
  const colorMode = useColorScheme();
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Authenticator.Provider>
        <Authenticator
          components={{
            SignIn: (props) => (
              <Authenticator.SignIn {...props} Header={MyHeader} />
            ),
          }}
        >
          <View style={style.container}>
            <SignOutButton />
          </View>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
