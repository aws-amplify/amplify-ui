// ignore_for_file: implementation_imports

import 'dart:async';
import 'dart:convert';

import 'package:amplify_auth_plugin_interface/amplify_auth_plugin_interface.dart';

import 'package:amplify_flutter/amplify_flutter.dart';
export 'package:amplify_flutter/src/amplify_impl.dart';

class AmplifyStub extends AmplifyClass {
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
    if (_isConfigured) {
      throw const AmplifyAlreadyConfiguredException(
        'Amplify has already been configured and adding plugins after configure is not supported.',
        recoverySuggestion:
            'Check if Amplify is already configured using Amplify.isConfigured.',
      );
    }
    try {
      if (plugin is AuthPluginInterface) {
        await Auth.addPlugin(plugin);
        Hub.addChannel(HubChannel.Auth, plugin.streamController);
      } else {
        throw AmplifyException(
          'The type of plugin ' +
              plugin.runtimeType.toString() +
              ' is not yet supported in Amplify.',
          recoverySuggestion:
              AmplifyExceptionMessages.missingRecoverySuggestion,
        );
      }
    } on Exception catch (e) {
      safePrint('Amplify plugin was not added');
      throw AmplifyException(
        'Amplify plugin ' +
            plugin.runtimeType.toString() +
            ' was not added successfully.',
        recoverySuggestion: AmplifyExceptionMessages.missingRecoverySuggestion,
        underlyingException: e.toString(),
      );
    }
  }

  @override
  Future<void> addPlugins(List<AmplifyPluginInterface> plugins) =>
      Future.wait(plugins.map(addPlugin));

  @override
  Future<void> configure(String configuration) async {
    // Validation #1
    if (_isConfigured) {
      throw const AmplifyAlreadyConfiguredException(
        'Amplify has already been configured and re-configuration is not supported.',
        recoverySuggestion:
            'Check if Amplify is already configured using Amplify.isConfigured.',
      );
    }

    // Validation #2. Try decoding the json string
    try {
      jsonDecode(configuration);
    } on FormatException catch (e) {
      throw AmplifyException(
          'The provided configuration is not a valid json. Check underlyingException.',
          recoverySuggestion:
              'Inspect your amplifyconfiguration.dart and ensure that the string is proper json',
          underlyingException: e.toString());
    }

    _isConfigured = true;

    if (_isConfigured && !_configCompleter.isCompleted) {
      _config = _parseConfigJson(configuration);
      _configCompleter.complete(_config);
    }
  }

  AmplifyConfig _parseConfigJson(String configuration) {
    try {
      return AmplifyConfig.fromJson(jsonDecode(configuration));
    } on Exception catch (e) {
      safePrint(
        'There was an unexpected problem parsing the amplifyconfiguration.dart file: $e',
      );
      return const AmplifyConfig();
    }
  }

  AmplifyStub() : super.protected();
}
