import { useRef } from 'react';
import classNames from 'classnames';
import {
  Flex,
  Heading,
  Text,
  Link,
  View,
  Authenticator,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

import { HomeCode } from '@/components/home/HomeCode';
import { HomeCTA } from '@/components/home/HomeCTA';
import { CodeHighlight } from '@/components/CodeHighlight';
import { useIntersectionObserver } from '@/components/useIntersection';
import { FlutterAuthenticatorExample } from '@/components/FlutterAuthenticatorExample';
import { BrowserMock } from '@/components/home/BrowserMock';
import { trackScroll } from '@/utils/track';

// TODO: grab this code from actual examples so we don't need to keep these in sync
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

  import { Amplify } from 'aws-amplify';
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
  flutter: `class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    _configureAmplify();
  }

  void _configureAmplify() async {
    try {
      await Amplify.addPlugin(AmplifyAuthCognito());
      await Amplify.configure(amplifyconfig);
      print('Successfully configured');
    } on Exception catch (e) {
      print('Error configuring Amplify: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      child: MaterialApp(
        builder: Authenticator.builder(),
        home: const Scaffold(
          body: Center(
            child: Text('You are logged in!'),
          ),
        ),
      ),
    );
  }
}`,
  'react-native': `import React from 'react';
import { Button } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
`,
};

const languages = {
  react: 'jsx',
  angular: 'javascript', // is this the best primsa language?
  vue: 'javascript',
  flutter: 'dart',
  'react-native': 'jsx',
};

const fileName = {
  react: 'index.tsx',
  angular: 'index.html',
  vue: 'index.vue',
  flutter: 'main.dart',
  'react-native': 'App.jsx',
};

export const AuthenticationSection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Authentication');
  }
  const hiddenOnMobile = useBreakpointValue({
    base: false,
    medium: true,
  });

  return (
    <View
      ref={ref}
      as="section"
      id="authentication"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
    >
      <Flex direction="column">
        <Flex direction="column" className="docs-home-subsection--thin">
          <Heading
            level={2}
            className={classNames('expand-out', isVisible && 'shown')}
          >
            <strong>Authentication</strong> made easy
          </Heading>
          <Text className="docs-home-text">
            Add authentication to your app in under 10 lines of code using the
            Authenticator component. The Authenticator works seamlessly with the{' '}
            <Link href="https://docs.amplify.aws/cli/start/install/">
              Amplify CLI
            </Link>{' '}
            to <strong>automatically</strong> work with your backend, no extra
            configuration needed! Customize every detail of the authentication
            flow with themes, overrides, or bring your own UI with a headless
            mode.
          </Text>
        </Flex>

        <Flex
          direction={{
            base: 'column',
            xl: 'row',
          }}
          alignItems="center"
          gap="xxl"
          className="docs-home-subsection"
        >
          {platform === 'flutter' ? (
            <View flex="1">
              <FlutterAuthenticatorExample id="flutter-authenticator-home" />
            </View>
          ) : platform === 'react-native' ? null : (
            <BrowserMock flex="1" location="https://localhost">
              <Authenticator />
            </BrowserMock>
          )}

          {hiddenOnMobile ? (
            <HomeCode flex="1" fileName={fileName[platform]}>
              <CodeHighlight
                code={authenticatorCode[platform]}
                language={languages[platform]}
                withLines
              />
            </HomeCode>
          ) : null}
        </Flex>
        <HomeCTA href={`/${platform}/connected-components/authenticator`}>
          Get started with the Authenticator
        </HomeCTA>
      </Flex>
    </View>
  );
};
