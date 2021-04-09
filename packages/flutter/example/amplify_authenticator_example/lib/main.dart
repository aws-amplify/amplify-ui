import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'amplifyconfiguration.dart';

import 'stories/confirmPasswordExample/confirmPasswordExample.dart';
import 'stories/material/materialAuthenticatorExample.dart';
import 'stories/materialTheme/materialThemeExample.dart';
import 'stories/materialCustomStyles/materialCustomStylesExample.dart';
import 'stories/customWorkflow/customWorkflowExample.dart';
import 'stories/animationExample/animationExample.dart';

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

class ExampleListTileItem {
  final Widget view;
  final String title;
  final String subtitle;
  ExampleListTileItem({
    @required this.view,
    @required this.title,
    @required this.subtitle,
  });
}

class AuthStories extends StatelessWidget {
  const AuthStories({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<ExampleListTileItem> exampleListTileItems = [
      ExampleListTileItem(
        view: MaterialAuthenticatorExample(),
        title: 'Material Default Example',
        subtitle: 'A simple example using the MaterialAuthenticator component.',
      ),
      ExampleListTileItem(
        view: MaterialThemeExample(),
        title: 'Material Themed Example ',
        subtitle:
            'An example using the MaterialAuthenticator component with a non-default material theme.',
      ),
      ExampleListTileItem(
        view: MaterialCustomeStylesExample(),
        title: 'Custom Design Example ',
        subtitle:
            'An example using the MaterialAuthenticator component with a more customized theme.',
      ),
      ExampleListTileItem(
        view: ConfirmPasswordExample(),
        title: 'Confirm Password Example ',
        subtitle:
            'An example that uses a custom sign up view that requires a user re-enters their password.',
      ),
      ExampleListTileItem(
        view: CustomWorkflowExample(),
        title: 'Custom Workflow ',
        subtitle:
            'An example using the MaterialAuthenticatorBuilder component to build a custom workflow.',
      ),
      ExampleListTileItem(
        view: AnimationExample(),
        title: 'Custom Animation Example ',
        subtitle:
            'An example using the MaterialAuthenticatorBuilder component to create custom animations between views.',
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Authenticator Stories'),
      ),
      body: ListView(
        padding: EdgeInsets.all(10.0),
        children: <Widget>[
          ...exampleListTileItems.map(
            (exampleListTileItem) {
              return ListTile(
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => exampleListTileItem.view,
                  ),
                ),
                isThreeLine: true,
                title: Text(exampleListTileItem.title),
                subtitle: Text(exampleListTileItem.subtitle),
                trailing: Icon(Icons.chevron_right),
              );
            },
          ),
        ],
      ),
    );
  }
}
