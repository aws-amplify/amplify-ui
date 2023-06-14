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

// configuration values for the Demo such as theme and initial step
import 'dart:convert';

import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/material.dart';

class AuthenticatorConfig {
  AuthenticatorConfig({
    this.id = '',
    this.themeMode = ThemeMode.light,
    this.initialStep = AuthenticatorStep.signIn,
    String? amplifyConfig,
    this.signUpAttributes = const [],
    this.useCustomUI = false,
    this.useCustomTheme = false,
    this.device = Device.ios,
  }) : amplifyConfig = amplifyConfig ?? buildAmplifyConfig();
  final String id;
  final ThemeMode themeMode;
  final AuthenticatorStep initialStep;
  final String amplifyConfig;
  final List<SignUpFormField<dynamic>> signUpAttributes;
  final bool useCustomUI;
  final bool useCustomTheme;
  final Device device;

  static AuthenticatorConfig fromMap(Map<String, String?> map) {
    return AuthenticatorConfig(
      id: map['id'] ?? '',
      themeMode: _parseThemeMode(map['themeMode']),
      initialStep: _parseAuthenticatorStep(map['initialStep']),
      amplifyConfig: buildAmplifyConfig(
          usernameAttribute: map['usernameAttribute'] ?? 'USERNAME',
          includeSocialProviders: map['includeSocialProviders'] == 'true'),
      signUpAttributes: _parseSignUpAttributes(map['signUpAttributes']),
      useCustomUI: map['useCustomUI'] == 'true',
      useCustomTheme: map['useCustomTheme'] == 'true',
      device: Device.parse(map['device']),
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

  static List<SignUpFormField<dynamic>> _parseSignUpAttributes(String? value) {
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
                    return 'Your website must have a domain of example.com';
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
        .whereType<SignUpFormField<dynamic>>()
        .toList();
  }
}

String buildAmplifyConfig({
  String? usernameAttribute = 'USERNAME',
  bool includeSocialProviders = false,
}) {
  usernameAttribute = usernameAttribute?.toUpperCase();
  final config = {
    'UserAgent': 'aws-amplify-cli/2.0',
    'Version': '1.0',
    'auth': {
      'plugins': {
        'awsCognitoAuthPlugin': {
          'Auth': {
            'Default': {
              'authenticationFlowType': 'USER_SRP_AUTH',
              'socialProviders': includeSocialProviders
                  ? ['AMAZON', 'APPLE', 'FACEBOOK', 'GOOGLE']
                  : <String>[],
              'usernameAttributes': usernameAttribute == 'USERNAME'
                  ? <String>[]
                  : [usernameAttribute],
              'signupAttributes': usernameAttribute == 'USERNAME'
                  ? ['EMAIL']
                  : [usernameAttribute],
              'passwordProtectionSettings': {
                'passwordPolicyMinLength': 6,
                'passwordPolicyCharacters': <String>[]
              },
              'mfaConfiguration': 'OFF',
              'mfaTypes': ['SMS'],
              'verificationMechanisms': usernameAttribute == 'USERNAME'
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

enum Device {
  ios,
  android,
  iPad,
  web;

  static Device parse(String? value) {
    switch (value?.toLowerCase()) {
      case 'ios':
        return Device.ios;
      case 'android':
        return Device.android;
      case 'ipad':
        return Device.iPad;
      case 'web':
        return Device.web;
      default:
        return Device.ios;
    }
  }

  DeviceInfo? toDeviceInfo() {
    switch (this) {
      case Device.ios:
        return Devices.ios.iPhone13;
      case Device.android:
        return Devices.android.mediumPhone;
      case Device.iPad:
        return Devices.ios.iPad;
      case Device.web:
        return null;
    }
  }
}
