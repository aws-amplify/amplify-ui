import 'dart:convert';

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter_authenticator_example/stubs/amplify_auth_cognito_stub.dart';
import 'package:flutter_authenticator_example/stubs/amplify_stub.dart';
import 'package:flutter/material.dart';

// configuration values for the Demo such as theme and initial step
class AuthenticatorConfig {
  final ThemeMode themeMode;
  final AuthenticatorStep initialStep;
  final String config;
  final List<SignUpFormField> signUpAttributes;
  AuthenticatorConfig({
    this.themeMode = ThemeMode.light,
    this.initialStep = AuthenticatorStep.signIn,
    String? config,
    this.signUpAttributes = const [],
  }) : config = config ?? buildConfig();

  static AuthenticatorConfig fromMap(Map<String, String?> map) {
    return AuthenticatorConfig(
      themeMode: _parseThemeMode(map['themeMode']),
      initialStep: _parseAuthenticatorStep(map['initialStep']),
      config: buildConfig(
          usernameAttribute: map['usernameAttribute'] ?? 'USERNAME',
          includeSocialProviders: map['includeSocialProviders'] == 'true'),
      signUpAttributes: _parseSignUpAttributes(map['signUpAttributes']),
    );
  }

  AuthenticatorConfig copyWith({
    ThemeMode? themeMode,
    AuthenticatorStep? initialStep,
  }) {
    return AuthenticatorConfig(
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

  static List<SignUpFormField> _parseSignUpAttributes(String? value) {
    final signUpFields = value?.split('|') ?? [];
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
            default:
              return SignUpFormField.custom(
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
      home: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            DeviceFrame(
              screen: const MyApp(),
              device: Devices.ios.iPhone13,
            ),
          ],
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
  AuthenticatorConfig _authenticatorConfig = AuthenticatorConfig();
  @override
  void initState() {
    super.initState();
    _setAuthenticatorConfig();
    _configureAmplify();
  }

  void _setAuthenticatorConfig() {
    var queryString = html.window.location.search?.substring(1);
    var queryArray = queryString?.split('&') ?? [];
    Map<String, String> queryParams = {
      for (var entry in queryArray) entry.split('=')[0]: entry.split('=')[1]
    };
    final newConfig = AuthenticatorConfig.fromMap(queryParams);
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
    } on Exception catch (e) {
      print('An error occurred configuring Amplify: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      signUpForm: SignUpForm.custom(
        fields: _authenticatorConfig.signUpAttributes,
      ),
      initialStep: _authenticatorConfig.initialStep,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        useInheritedMediaQuery: true,
        title: 'Authenticator Demo',
        builder: Authenticator.builder(),
        theme: ThemeData.light(),
        darkTheme: ThemeData.dark(),
        themeMode: _authenticatorConfig.themeMode,
        home: Scaffold(
          appBar: AppBar(),
          body: Center(
            child: Column(
              children: const [
                Text('You are logged in!'),
                SizedBox(height: 16),
                SignOutButton(),
              ],
            ),
          ),
        ),
      ),
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
                "passwordPolicyMinLength": 8,
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
