import 'dart:html' as html;

import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter_authenticator_example/stubs/amplify_auth_cognito_stub.dart';
import 'package:flutter_authenticator_example/stubs/amplify_stub.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'amplifyconfiguration.dart';

// configuration values for the Demo such as theme and initial step
class DemoConfig {
  final ThemeMode themeMode;
  final AuthenticatorStep initialStep;
  const DemoConfig({
    this.themeMode = ThemeMode.light,
    this.initialStep = AuthenticatorStep.signIn,
  });

  static DemoConfig fromMap(Map<String, String?> map) {
    return DemoConfig(
      themeMode: _parseThemeMode(map['themeMode']),
      initialStep: _parseAuthenticatorStep(map['initialStep']),
    );
  }

  DemoConfig copyWith({
    ThemeMode? themeMode,
    AuthenticatorStep? initialStep,
  }) {
    return DemoConfig(
      themeMode: themeMode ?? this.themeMode,
      initialStep: initialStep ?? this.initialStep,
    );
  }

  static ThemeMode _parseThemeMode(String? value) {
    switch (value) {
      case 'dark':
        return ThemeMode.dark;
      case 'light':
        return ThemeMode.light;
      case 'system':
        return ThemeMode.system;
      default:
        return ThemeMode.dark;
    }
  }

  static AuthenticatorStep _parseAuthenticatorStep(String? value) {
    switch (value) {
      case 'signIn':
        return AuthenticatorStep.signIn;
      case 'signUp':
        return AuthenticatorStep.signUp;
      case 'resetPassword':
        return AuthenticatorStep.resetPassword;
      case 'onboarding':
        return AuthenticatorStep.onboarding;
      default:
        return AuthenticatorStep.signIn;
    }
  }
}

class DemoConfigChangeNotifier with ChangeNotifier {
  DemoConfig _demoConfig = const DemoConfig();

  ThemeMode get themeMode => _demoConfig.themeMode;
  AuthenticatorStep get initialStep => _demoConfig.initialStep;

  setConfig(DemoConfig config) {
    _demoConfig = config;
    notifyListeners();
  }

  set themeMode(ThemeMode themeMode) {
    _demoConfig = _demoConfig.copyWith(themeMode: themeMode);
    notifyListeners();
  }
}

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
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DemoConfigChangeNotifier()),
      ],
      child: MaterialApp(
        home: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              DeviceFrame(
                screen: const MyApp(),
                device: Devices.ios.iPhone13,
              ),
              // TODO: Add Android example
              // DeviceFrame(
              //   screen: const MyApp(),
              //   device: Devices.android.samsungGalaxyS20,
              // ),
            ],
          ),
        ),
      ),
    );
  }
}

class MyApp extends StatefulWidget {
  const MyApp({
    Key? key,
  }) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    _configureAmplify();
    _setDemoConfig();
  }

  void _setDemoConfig() {
    var queryString = html.window.location.search?.substring(1);
    var queryArray = queryString?.split('&') ?? [];
    Map<String, String> queryParams = {
      for (var entry in queryArray) entry.split('=')[0]: entry.split('=')[1]
    };
    final newConfig = DemoConfig.fromMap(queryParams);
    final config = context.read<DemoConfigChangeNotifier>();
    config.setConfig(newConfig);
  }

  Future<void> _configureAmplify() async {
    try {
      // stub Amplify
      Amplify = AmplifyStub();
      // add the auth plugin stub
      await Amplify.addPlugin(AmplifyAuthCognitoStub());
      // configure amplify
      await Amplify.configure(amplifyconfig);
    } on Exception catch (e) {
      print('An error occurred configuring Amplify: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final config = context.watch<DemoConfigChangeNotifier>();

    return Authenticator(
      initialStep: config.initialStep,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        useInheritedMediaQuery: true,
        title: 'Authenticator Demo',
        builder: Authenticator.builder(),
        theme: ThemeData.light(),
        darkTheme: ThemeData.dark(),
        themeMode: config.themeMode,
        home: Scaffold(
          appBar: AppBar(),
          body: Column(
            children: const [
              Text('You are logged in!'),
              SignOutButton(),
            ],
          ),
        ),
      ),
    );
  }
}
