import * as React from 'react';

import {
  Flex,
  Heading,
  Text,
  Link,
  useTheme,
  View,
  Authenticator,
} from '@aws-amplify/ui-react';
import { HomeCode } from 'src/pages/[platform]/home/HomeCode';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { HomeCodeHighlight } from '@/components/CodeHighlight';
import { useIntersectionObserver } from 'src/hooks/useIntersection';

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
  flutter: `import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';

import 'amplifyconfiguration.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
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
};

const languages = {
  react: 'jsx',
  angular: 'javascript', // is this the best primsa language?
  vue: 'javascript',
  flutter: 'dart',
};

export const AuthenticationSection = ({ platform }) => {
  const { tokens } = useTheme();

  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View ref={ref} as="section" className="docs-home-section">
      <View className="docs-home-container">
        <Heading
          level={2}
          textAlign="center"
          className={`fade-in ${isVisible ? 'shown' : ''}`}
        >
          <strong>Authentication</strong> made easy
        </Heading>
        <Text className="docs-home-description">
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
      </View>

      <Flex direction="row" padding={tokens.space.xxl} className="docs-grid-bg">
        <HomeCode>
          <HomeCodeHighlight
            code={authenticatorCode[platform]}
            language={languages[platform]}
            withLines={true}
          />
        </HomeCode>
        <View flex="1">
          <Authenticator></Authenticator>
        </View>
      </Flex>
      <HomeCTA href={`/${platform}/components/authenticator`}>
        Get started with the Authenticator
      </HomeCTA>
    </View>
  );
};
