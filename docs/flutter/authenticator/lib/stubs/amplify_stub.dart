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

// stub copied from https://github.com/aws-amplify/amplify-flutter/tree/6b141a2e15d47c4bb936c7baefd4e1a20e9ed9b3/packages/amplify_test/lib/src/stubs

import 'dart:async';
import 'dart:convert';

// ignore: depend_on_referenced_packages
import 'package:amplify_core/amplify_core.dart';

/// A stub of [Amplify] that holds the config in memory and
/// does nothing else to register plugins.
class AmplifyStub extends AmplifyClass {
  AmplifyStub() : super.protected();
  AmplifyConfig? _config;

  bool _isConfigured = false;

  final _configCompleter = Completer<AmplifyConfig>();

  @override
  bool get isConfigured {
    return _isConfigured;
  }

  @override
  Future<AmplifyConfig> get asyncConfig {
    return _configCompleter.future;
  }

  @override
  Future<void> addPlugin(AmplifyPluginInterface plugin) async {
    try {
      if (plugin is AuthPluginInterface) {
        await Auth.addPlugin(
          plugin,
          authProviderRepo: AmplifyAuthProviderRepository(),
        );
      } else {
        throw StateError(
          'The type of plugin ${plugin.runtimeType} is not yet supported.',
        );
      }
    } on Exception {
      throw StateError(
        'Amplify plugin ${plugin.runtimeType} was not added successfully.',
      );
    }
  }

  @override
  Future<void> addPlugins(List<AmplifyPluginInterface> plugins) =>
      Future.wait(plugins.map(addPlugin));

  @override
  Future<void> configure(String configuration) async {
    try {
      jsonDecode(configuration);
    } on FormatException {
      throw Exception(
        'The provided configuration is not a valid json.',
      );
    }

    _isConfigured = true;

    if (_isConfigured && !_configCompleter.isCompleted) {
      _config = _parseConfigJson(configuration);
      _configCompleter.complete(_config);
    }
  }

  AmplifyConfig _parseConfigJson(String configuration) {
    try {
      return AmplifyConfig.fromJson(
        jsonDecode(configuration) as Map<String, Object?>,
      );
    } on Exception {
      return const AmplifyConfig();
    }
  }

  @override
  Future<void> addPluginPlatform(AmplifyPluginInterface plugin) async {
    // no-op
  }
}
