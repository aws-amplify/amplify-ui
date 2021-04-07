import 'package:flutter/material.dart';

import 'buttons.dart';
import 'username_form_field.dart';

class MaterialForgotPasswordView extends StatelessWidget {
  MaterialForgotPasswordView();

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          UsernameFormField(),
          SizedBox(height: 12.0),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              BackToSignInLink(),
              ResetPasswordButton(),
            ],
          )
        ],
      ),
    );
  }
}
