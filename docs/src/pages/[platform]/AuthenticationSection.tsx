import NextLink from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import {
  Button,
  Flex,
  Heading,
  Text,
  Link,
  useTheme,
  View,
  Authenticator,
  Card,
} from '@aws-amplify/ui-react';

const authenticatorCode = {
  angular: `<amplify-authenticator>
  <ng-template
    amplifySlot="authenticated"
    let-user="user"
    let-signOut="signOut"
  >
    <h1>Welcome {{ user.username }}!</h1>
    <button (click)="signOut()">Sign Out</button>
  </ng-template>
</amplify-authenticator>`,
  react: `import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}`,
  vue: `<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";

  import Amplify from 'aws-amplify';
  import awsconfig from './aws-exports';

  Amplify.configure(awsconfig);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>`,
};

export const AuthenticationSection = ({ platform }) => {
  const { tokens } = useTheme();
  const { colors } = tokens;
  const language = platform === 'react' ? 'jsx' : 'html';
  return (
    <>
      <View as="section" className="docs-home-section">
        <Flex className="container" justifyContent="center">
          <View maxWidth="60rem">
            <Heading level={2}>Authentication made easy</Heading>
            <Text className="docs-home-description">
              Add authentication to your app in under 10 lines of code using the
              Authenticator component. The Authenticator works seamlessly with
              the{' '}
              <Link href="https://docs.amplify.aws/cli/start/install/">
                Amplify CLI
              </Link>{' '}
              to <strong>automatically</strong> work with your backend, no extra
              configuration needed! Customize every detail of the authentication
              flow with themes, overrides, or bring your own UI with a headless
              mode.
            </Text>
          </View>
        </Flex>
      </View>
      <Flex direction="row" padding={tokens.space.xxl} className="docs-grid-bg">
        <Card flex="1" className="docs-home-code-card">
          <Highlight
            Prism={defaultProps.Prism}
            code={authenticatorCode[platform]}
            language={language as Language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <View
                as="pre"
                className={className}
                backgroundColor={colors.background.primary}
              >
                <View
                  as="code"
                  className={className}
                  backgroundColor={colors.background.primary}
                >
                  {tokens.map((line, i) => (
                    <div
                      className="code-line"
                      key={i}
                      {...getLineProps({ line, key: i })}
                    >
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </View>
              </View>
            )}
          </Highlight>
        </Card>
        <View flex="1">
          <Authenticator></Authenticator>
        </View>
      </Flex>
      <View as="section" className="docs-home-section">
        <Flex justifyContent="center">
          <NextLink href={`/${platform}/components/authenticator`} passHref>
            <Button as="a" size="large">
              Get started with the Authenticator
            </Button>
          </NextLink>
        </Flex>
      </View>
    </>
  );
};
