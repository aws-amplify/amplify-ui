import 'package:flutter/material.dart';

import 'buttons.dart';
import 'password_form_field.dart';
import 'username_form_field.dart';

class MaterialSignInView extends StatelessWidget {
  MaterialSignInView();

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
