import 'package:flutter/material.dart';

import 'buttons.dart';
import 'email_form_field.dart';
import 'password_form_field.dart';
import 'username_form_field.dart';

class MaterialSignUpView extends StatelessWidget {
  MaterialSignUpView({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up'),
      ),
      body: Padding(
        // TODO: allow customers to override padding
        padding: const EdgeInsets.all(16.0),
        child: MaterialSignUpForm(),
      ),
    );
  }
}

class MaterialSignUpForm extends StatelessWidget {
  const MaterialSignUpForm({
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
          EmailFormField(),
          SizedBox(height: 12.0),
          PasswordFormField(),
          SizedBox(height: 12.0),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SignInLink(),
              SignUpButton(),
            ],
          )
        ],
      ),
    );
  }
}
