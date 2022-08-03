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
import 'package:flutter_authenticator_example/authenticator_config.dart';
import 'package:flutter_authenticator_example/stubs/amplify_auth_cognito_stub.dart';
import 'package:flutter_authenticator_example/stubs/amplify_stub.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const FlutterAuthenticatorPreview());
}

class FlutterAuthenticatorPreview extends StatefulWidget {
  const FlutterAuthenticatorPreview({
    Key? key,
  }) : super(key: key);

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
    return MaterialApp(
      home: Row(
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
    );
  }
}

class MyApp extends StatefulWidget {
  const MyApp({
    Key? key,
    required this.config,
  }) : super(key: key);

  final AuthenticatorConfig config;

  @override
  _MyAppState createState() => _MyAppState();
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
      await Amplify.addPlugin(AmplifyAuthCognitoStub());
      // configure amplify
      await Amplify.configure(widget.config.amplifyConfig);
      final message = {
        'name': 'loaded',
        'id': widget.config.id,
      };
      window.parent?.postMessage(jsonEncode(message), "*");
    } on Exception catch (e) {
      print('An error occurred configuring Amplify: $e');
    }
  }

  ThemeData get theme {
    final theme =
        widget.config.useCustomTheme ? customLightTheme : ThemeData.light();
    return widget.config.device == Device.web
        ? theme
        : theme.copyWith(
            // VisualDensity is by default standard on ios/android
            visualDensity: VisualDensity.standard,
          );
  }

  ThemeData get darkTheme {
    final theme =
        widget.config.useCustomTheme ? customDarkTheme : ThemeData.dark();
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
        useInheritedMediaQuery: true,
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
    Key? key,
  }) : super(key: key);

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
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
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

Widget? customBuilder(BuildContext context, AuthenticatorState state) {
  const padding = EdgeInsets.only(left: 16, right: 16, top: 48, bottom: 16);
  switch (state.currentStep) {
    case AuthenticatorStep.signIn:
      return Scaffold(
        body: Padding(
          padding: padding,
          child: SingleChildScrollView(
            child: Column(
              children: [
                // app logo
                const Center(child: FlutterLogo(size: 100)),
                // prebuilt sign in form from amplify_authenticator package
                SignInForm(),
              ],
            ),
          ),
        ),
        // custom button to take the user to sign up
        persistentFooterButtons: [
          Row(
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
        ],
      );
    case AuthenticatorStep.signUp:
      return Scaffold(
        body: Padding(
          padding: padding,
          child: SingleChildScrollView(
            child: Column(
              children: [
                // app logo
                const Center(child: FlutterLogo(size: 100)),
                // prebuilt sign up form from amplify_authenticator package
                SignUpForm(),
              ],
            ),
          ),
        ),
        // custom button to take the user to sign in
        persistentFooterButtons: [
          Row(
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
        ],
      );
    default:
      // returning null defaults to the prebuilt authenticator for all other steps
      return null;
  }
}

// light theme
ThemeData customLightTheme = ThemeData(
  // app's colors scheme and brightness
  colorScheme: ColorScheme.fromSwatch(
    brightness: Brightness.light,
    primarySwatch: Colors.indigo,
  ),
  // tab bar indicator color
  indicatorColor: Colors.indigo,
  textTheme: const TextTheme(
    // text theme of the header on each step
    headline6: TextStyle(
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
      padding: MaterialStateProperty.all<EdgeInsets>(const EdgeInsets.all(16)),
      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
  ),
);

// dark theme
ThemeData customDarkTheme = ThemeData(
  colorScheme: ColorScheme.fromSwatch(
    brightness: Brightness.dark,
    primarySwatch: Colors.indigo,
  ),
  indicatorColor: Colors.indigo,
  textTheme: const TextTheme(
    headline6: TextStyle(
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
      padding: MaterialStateProperty.all<EdgeInsets>(const EdgeInsets.all(16)),
      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
  ),
);
