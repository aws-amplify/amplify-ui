// Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'dart:convert';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html';

import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:confetti/confetti.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_authenticator_example/authenticator_config.dart';
import 'package:flutter_authenticator_example/stubs/amplify_auth_cognito_stub.dart';
import 'package:flutter_authenticator_example/stubs/amplify_stub.dart';

/// The color of --amplify-colors-background-primary in dark mode.
const backgroundPrimaryDark = Color.fromRGBO(13, 26, 38, 1);

/// The color of --amplify-colors-background-primary in light mode.
const backgroundPrimaryLight = Colors.white;

void main() {
  runApp(const FlutterAuthenticatorPreview());
}

class FlutterAuthenticatorPreview extends StatefulWidget {
  const FlutterAuthenticatorPreview({
    super.key,
  });

  @override
  State<FlutterAuthenticatorPreview> createState() =>
      _FlutterAuthenticatorPreviewState();
}

class _FlutterAuthenticatorPreviewState
    extends State<FlutterAuthenticatorPreview> {
  AuthenticatorConfig _config = AuthenticatorConfig();
  @override
  void initState() {
    super.initState();
    _setAuthenticatorConfig();
  }

  void _setAuthenticatorConfig() {
    final newConfig = AuthenticatorConfig.fromMap(Uri.base.queryParameters);
    setState(() {
      _config = newConfig;
    });
  }

  @override
  Widget build(BuildContext context) {
    final deviceInfo = _config.device.toDeviceInfo();
    if (deviceInfo == null) {
      return MyApp(config: _config);
    }
    final color = switch (_config.themeMode) {
      ThemeMode.dark => backgroundPrimaryDark,
      ThemeMode.light => backgroundPrimaryLight,
      ThemeMode.system => switch (MediaQuery.of(context).platformBrightness) {
          Brightness.dark => backgroundPrimaryDark,
          Brightness.light => backgroundPrimaryLight,
        }
    };
    return MaterialApp(
      home: ColoredBox(
        color: color,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            DeviceFrame(
              screen: MyApp(
                config: _config,
              ),
              device: deviceInfo,
            ),
          ],
        ),
      ),
    );
  }
}

class MyApp extends StatefulWidget {
  const MyApp({
    super.key,
    required this.config,
  });

  final AuthenticatorConfig config;

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    _configureAmplify();
  }

  Future<void> _configureAmplify() async {
    try {
      // stub Amplify
      Amplify = AmplifyStub();
      // add the auth plugin stub
      await Amplify.addPlugin(
        AmplifyAuthCognitoStub(
          delay: const Duration(milliseconds: 100),
        ),
      );
      // configure amplify
      await Amplify.configure(widget.config.amplifyConfig);
      final message = {
        'name': 'loaded',
        'id': widget.config.id,
      };
      window.parent?.postMessage(jsonEncode(message), '*');
    } on Exception catch (e) {
      safePrint('An error occurred configuring Amplify: $e');
    }
  }

  ThemeData get theme {
    final theme = widget.config.useCustomTheme
        ? customLightTheme
        : ThemeData.light(useMaterial3: true);
    return widget.config.device == Device.web
        ? theme
        : theme.copyWith(
            // VisualDensity is by default standard on ios/android
            visualDensity: VisualDensity.standard,
          );
  }

  ThemeData get darkTheme {
    final theme = widget.config.useCustomTheme
        ? customDarkTheme
        : ThemeData.dark(useMaterial3: true);
    return widget.config.device == Device.web
        ? theme
        : theme.copyWith(
            // VisualDensity is by default standard on ios/android
            visualDensity: VisualDensity.standard,
          );
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      authenticatorBuilder: widget.config.useCustomUI ? customBuilder : null,
      signUpForm: widget.config.signUpAttributes.isNotEmpty
          ? SignUpForm.custom(
              fields: widget.config.signUpAttributes,
            )
          : null,
      initialStep: widget.config.initialStep,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Authenticator Demo',
        builder: Authenticator.builder(),
        theme: theme,
        darkTheme: darkTheme,
        themeMode: widget.config.themeMode,
        home: const HomeWidget(),
      ),
    );
  }
}

class HomeWidget extends StatefulWidget {
  const HomeWidget({
    super.key,
  });

  @override
  State<HomeWidget> createState() => _HomeWidgetState();
}

class _HomeWidgetState extends State<HomeWidget> {
  late ConfettiController _controller;

  @override
  void initState() {
    _controller = ConfettiController(duration: const Duration(seconds: 10));
    _controller.play();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Scaffold(
          appBar: AppBar(),
          body: const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'You are logged in!',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 32),
                SignOutButton(),
              ],
            ),
          ),
        ),
        Align(
          alignment: Alignment.topCenter,
          child: ConfettiWidget(
            confettiController: _controller,
            canvas: const Size(800, 800),
            shouldLoop: true,
            blastDirectionality: BlastDirectionality.explosive,
            emissionFrequency: 0.04,
            minBlastForce: 10,
          ),
        ),
      ],
    );
  }
}

/// A widget that displays a logo, a body, and an optional footer.
class CustomScaffold extends StatelessWidget {
  const CustomScaffold({
    super.key,
    required this.state,
    required this.body,
    this.footer,
  });

  final AuthenticatorState state;
  final Widget body;
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              // App logo
              const Padding(
                padding: EdgeInsets.only(top: 32),
                child: Center(child: FlutterLogo(size: 100)),
              ),
              Container(
                constraints: const BoxConstraints(maxWidth: 600),
                child: body,
              ),
            ],
          ),
        ),
      ),
      persistentFooterButtons: footer != null ? [footer!] : null,
    );
  }
}

Widget? customBuilder(BuildContext context, AuthenticatorState state) {
  switch (state.currentStep) {
    case AuthenticatorStep.signIn:
      return CustomScaffold(
        state: state,
        // A prebuilt Sign In form from amplify_authenticator
        body: SignInForm(),
        // A custom footer with a button to take the user to sign up
        footer: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Don\'t have an account?'),
            TextButton(
              onPressed: () => state.changeStep(
                AuthenticatorStep.signUp,
              ),
              child: const Text('Sign Up'),
            ),
          ],
        ),
      );
    case AuthenticatorStep.signUp:
      return CustomScaffold(
        state: state,
        // A prebuilt Sign Up form from amplify_authenticator
        body: SignUpForm(),
        // A custom footer with a button to take the user to sign in
        footer: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Already have an account?'),
            TextButton(
              onPressed: () => state.changeStep(
                AuthenticatorStep.signIn,
              ),
              child: const Text('Sign In'),
            ),
          ],
        ),
      );
    case AuthenticatorStep.confirmSignUp:
      return CustomScaffold(
        state: state,
        // A prebuilt Confirm Sign Up form from amplify_authenticator
        body: ConfirmSignUpForm(),
      );
    case AuthenticatorStep.resetPassword:
      return CustomScaffold(
        state: state,
        // A prebuilt Reset Password form from amplify_authenticator
        body: ResetPasswordForm(),
      );
    case AuthenticatorStep.confirmResetPassword:
      return CustomScaffold(
        state: state,
        // A prebuilt Confirm Reset Password form from amplify_authenticator
        body: const ConfirmResetPasswordForm(),
      );
    default:
      // Returning null defaults to the prebuilt authenticator for all other steps
      return null;
  }
}

// light theme
ThemeData customLightTheme = ThemeData(
  useMaterial3: true,
  // app's colors scheme and brightness
  colorScheme: ColorScheme.fromSwatch(
    brightness: Brightness.light,
    primarySwatch: Colors.indigo,
  ),
  // tab bar indicator color
  indicatorColor: Colors.indigo,
  textTheme: const TextTheme(
    // text theme of the header on each step
    titleLarge: TextStyle(
      fontWeight: FontWeight.w600,
      fontSize: 24,
    ),
  ),
  // theme of the form fields for each step
  inputDecorationTheme: InputDecorationTheme(
    contentPadding: const EdgeInsets.all(16),
    floatingLabelBehavior: FloatingLabelBehavior.never,
    fillColor: Colors.grey[200],
    filled: true,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  ),
  // theme of the primary button for each step
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ButtonStyle(
      padding: WidgetStateProperty.all<EdgeInsets>(const EdgeInsets.all(16)),
      shape: WidgetStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
  ),
);

// dark theme
ThemeData customDarkTheme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSwatch(
    brightness: Brightness.dark,
    primarySwatch: Colors.indigo,
  ),
  indicatorColor: Colors.indigo,
  textTheme: const TextTheme(
    titleLarge: TextStyle(
      fontWeight: FontWeight.w600,
      fontSize: 24,
      color: Colors.white,
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    contentPadding: const EdgeInsets.all(16),
    floatingLabelBehavior: FloatingLabelBehavior.never,
    fillColor: Colors.grey[700],
    filled: true,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ButtonStyle(
      padding: WidgetStateProperty.all<EdgeInsets>(const EdgeInsets.all(16)),
      shape: WidgetStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
  ),
);
