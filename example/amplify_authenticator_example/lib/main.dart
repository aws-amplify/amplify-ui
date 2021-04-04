import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'amplifyconfiguration.dart';

import 'stories/cupertino/cupertinoAuthenticatorExample.dart';
import 'stories/material/materialAuthenticatorExample.dart';
import 'stories/materialTheme/materialThemeExample.dart';
import 'stories/materialCustomStyles/materialCustomStylesExample.dart';
import 'stories/customWorkflow/customWorkflowExample.dart';

void main() {
  runApp(DemoApp());
}

class DemoApp extends StatefulWidget {
  @override
  _DemoAppState createState() => _DemoAppState();
}

class _DemoAppState extends State<DemoApp> {
  @override
  void initState() {
    super.initState();
    _configureAmplify();
  }

  void _configureAmplify() async {
    if (!mounted) return;

    // Add Pinpoint and Cognito Plugins
    Amplify.addPlugin(AmplifyAnalyticsPinpoint());
    Amplify.addPlugin(AmplifyAuthCognito());

    // Once Plugins are added, configure Amplify
    // Note: Amplify can only be configured once.
    try {
      await Amplify.configure(amplifyconfig);
    } on AmplifyAlreadyConfiguredException {
      print("Amplify was already configured. Was the app restarted?");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: AuthStories(),
    );
  }
}

class AuthStories extends StatelessWidget {
  const AuthStories({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Authenticator Stories'),
      ),
      body: ListView(
        padding: EdgeInsets.all(10.0),
        children: <Widget>[
          Center(
            child: Column(
              children: [
                const Padding(padding: EdgeInsets.all(5.0)),
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MaterialAuthenticatorExample(),
                    ),
                  ),
                  child: const Text('Material Default Example'),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MaterialThemeExample(),
                    ),
                  ),
                  child: const Text('Material Theme Example'),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MaterialCustomeStylesExample(),
                    ),
                  ),
                  child: const Text('Material Custom Styles'),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    CupertinoPageRoute(
                      builder: (context) => CupertinoAuthenticatorExample(),
                    ),
                  ),
                  child: const Text('Cupertino Default Example'),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    CupertinoPageRoute(
                      builder: (context) => CustomWorkflowExample(),
                    ),
                  ),
                  child: const Text('Custom Workflow Example'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
