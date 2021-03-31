import 'package:amplify_authenticator/authenticator/components/cupertinoAuthenticator.dart';
import 'package:amplify_authenticator/stories/viewUserInfo.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CupertinoAuthenticatorExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      home: CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          leading: CupertinoNavigationBarBackButton(
            onPressed: () => Navigator.of(context).pop(),
          ),
          middle: Text('Cupertino Example'),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: CupertinoAuthenticator(
              onSignInSuccess: () => Navigator.pushReplacement(
                context,
                CupertinoPageRoute(
                  builder: (context) => ViewUserInfo(),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
