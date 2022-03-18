import 'dart:convert';
import 'dart:html';

import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:confetti/confetti.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter_authenticator_example/stubs/amplify_auth_cognito_stub.dart';
import 'package:flutter_authenticator_example/stubs/amplify_stub.dart';
import 'package:flutter/material.dart';

// configuration values for the Demo such as theme and initial step
class AuthenticatorConfig {
  final String id;
  final ThemeMode themeMode;
  final AuthenticatorStep initialStep;
  final String config;
  final List<SignUpFormField> signUpAttributes;
  final bool useCustomUI;
  final bool useCustomTheme;
  AuthenticatorConfig({
    this.id = '',
    this.themeMode = ThemeMode.light,
    this.initialStep = AuthenticatorStep.signIn,
    String? config,
    this.signUpAttributes = const [],
    this.useCustomUI = false,
    this.useCustomTheme = false,
  }) : config = config ?? buildConfig();

  static AuthenticatorConfig fromMap(Map<String, String?> map) {
    return AuthenticatorConfig(
      id: map['id'] ?? '',
      themeMode: _parseThemeMode(map['themeMode']),
      initialStep: _parseAuthenticatorStep(map['initialStep']),
      config: buildConfig(
          usernameAttribute: map['usernameAttribute'] ?? 'USERNAME',
          includeSocialProviders: map['includeSocialProviders'] == 'true'),
      signUpAttributes: _parseSignUpAttributes(map['signUpAttributes']),
      useCustomUI: map['useCustomUI'] == 'true',
      useCustomTheme: map['useCustomTheme'] == 'true',
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

  static List<SignUpFormField> _parseSignUpAttributes(String? value) {
    final signUpFields = value?.split(',') ?? [];
    return signUpFields
        .map((field) {
          switch (field) {
            case 'username':
              return SignUpFormField.username();
            case 'password':
              return SignUpFormField.password();
            case 'password_confirmation':
              return SignUpFormField.passwordConfirmation();
            case 'email':
              return SignUpFormField.email();
            case 'email-required':
              return SignUpFormField.email(required: true);
            case 'phone_number':
              return SignUpFormField.phoneNumber();
            case 'family_name':
              return SignUpFormField.familyName();
            case 'given_name':
              return SignUpFormField.givenName();
            case 'middle_name':
              return SignUpFormField.middleName();
            case 'name':
              return SignUpFormField.name();
            case 'nickname':
              return SignUpFormField.nickname();
            case 'preferred_username':
              return SignUpFormField.preferredUsername();
            case 'address':
              return SignUpFormField.address();
            case 'birthdate':
              return SignUpFormField.birthdate();
            case 'gender':
              return SignUpFormField.gender();
            case 'website':
              return SignUpFormField.custom(
                key: Key(field),
                required: true,
                validator: ((value) {
                  if (value == null || value.isEmpty) {
                    return 'You must provide a website';
                  }
                  if (!value.contains('example.com')) {
                    return 'Your website must be have a domain of example.com';
                  }
                  return null;
                }),
                title: 'Website',
                attributeKey: CognitoUserAttributeKey.website,
              );
            case 'bio':
              return SignUpFormField.custom(
                key: Key(field),
                title: 'Bio',
                attributeKey: CognitoUserAttributeKey.custom(field),
              );
            default:
              return SignUpFormField.custom(
                key: Key(field),
                title: field,
                attributeKey: CognitoUserAttributeKey.custom(field),
              );
          }
        })
        .whereType<SignUpFormField>()
        .toList();
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
    return MaterialApp(
      home: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          DeviceFrame(
            screen: const MyApp(),
            device: Devices.ios.iPhone13,
          ),
        ],
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
  AuthenticatorConfig _authenticatorConfig = AuthenticatorConfig();
  @override
  void initState() {
    super.initState();
    _setAuthenticatorConfig();
    _configureAmplify();
  }

  void _setAuthenticatorConfig() {
    final newConfig = AuthenticatorConfig.fromMap(Uri.base.queryParameters);
    setState(() {
      _authenticatorConfig = newConfig;
    });
  }

  Future<void> _configureAmplify() async {
    try {
      // stub Amplify
      Amplify = AmplifyStub();
      // add the auth plugin stub
      await Amplify.addPlugin(AmplifyAuthCognitoStub());
      // configure amplify
      await Amplify.configure(_authenticatorConfig.config);
      final message = {
        'name': 'loaded',
        'id': _authenticatorConfig.id,
      };
      window.parent?.postMessage(jsonEncode(message), "*");
    } on Exception catch (e) {
      print('An error occurred configuring Amplify: $e');
    }
  }

  ThemeData get theme {
    final theme = _authenticatorConfig.useCustomTheme
        ? customLightTheme
        : ThemeData.light();
    return theme.copyWith(visualDensity: VisualDensity.standard);
  }

  ThemeData get darkTheme {
    final theme = _authenticatorConfig.useCustomTheme
        ? customDarkTheme
        : ThemeData.dark();
    return theme.copyWith(visualDensity: VisualDensity.standard);
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      authenticatorBuilder:
          _authenticatorConfig.useCustomUI ? customBuilder : null,
      signUpForm: _authenticatorConfig.signUpAttributes.isNotEmpty
          ? SignUpForm.custom(
              fields: _authenticatorConfig.signUpAttributes,
            )
          : null,
      initialStep: _authenticatorConfig.initialStep,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        useInheritedMediaQuery: true,
        title: 'Authenticator Demo',
        builder: Authenticator.builder(),
        theme: theme,
        darkTheme: darkTheme,
        themeMode: _authenticatorConfig.themeMode,
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

String buildConfig({
  String? usernameAttribute = 'USERNAME',
  bool includeSocialProviders = false,
}) {
  usernameAttribute = usernameAttribute?.toUpperCase();
  Map<String, dynamic> config = {
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "auth": {
      "plugins": {
        "awsCognitoAuthPlugin": {
          "Auth": {
            "Default": {
              "authenticationFlowType": "USER_SRP_AUTH",
              "socialProviders": includeSocialProviders
                  ? ['AMAZON', 'APPLE', 'FACEBOOK', 'GOOGLE']
                  : [],
              "usernameAttributes":
                  usernameAttribute == 'USERNAME' ? [] : [usernameAttribute],
              "signupAttributes": usernameAttribute == 'USERNAME'
                  ? ['EMAIL']
                  : [usernameAttribute],
              "passwordProtectionSettings": {
                "passwordPolicyMinLength": 6,
                "passwordPolicyCharacters": []
              },
              "mfaConfiguration": "OFF",
              "mfaTypes": ["SMS"],
              "verificationMechanisms": usernameAttribute == 'USERNAME'
                  ? ['EMAIL']
                  : [usernameAttribute],
            }
          }
        }
      }
    }
  };
  return jsonEncode(config);
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
