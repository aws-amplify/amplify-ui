import 'package:flutter/material.dart';

import 'buttons.dart';
import 'password_form_field.dart';
import 'username_form_field.dart';

class MaterialSignInView extends StatelessWidget {
  MaterialSignInView({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign In')),
      body: Padding(
        // TODO: allow customers to override padding
        padding: const EdgeInsets.all(16.0),
        child: MaterialSignInForm(),
      ),
    );
  }
}

class MaterialSignInForm extends StatelessWidget {
  const MaterialSignInForm({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          UsernameFormField(),
          SizedBox(height: 12.0),
          PasswordFormField(),
          ForgotPasswordButton(),
          SizedBox(height: 12.0),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SignUpLink(),
              SignInButton(),
            ],
          )
        ],
      ),
    );
  }
}
