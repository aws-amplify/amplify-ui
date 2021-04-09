import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import '../viewUserInfo.dart';

class MaterialAuthenticatorExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialAuthenticator(
      child: ViewUserInfo(),
    );
  }
}
