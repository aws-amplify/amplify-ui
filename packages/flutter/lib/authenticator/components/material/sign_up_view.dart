import 'package:flutter/material.dart';

import 'buttons.dart';
import 'email_form_field.dart';
import 'password_form_field.dart';
import 'username_form_field.dart';

class MaterialSignUpView extends StatelessWidget {
  MaterialSignUpView();

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
