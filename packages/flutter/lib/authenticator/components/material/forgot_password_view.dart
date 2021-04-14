import 'package:flutter/material.dart';

import 'buttons.dart';
import 'username_form_field.dart';

class MaterialForgotPasswordView extends StatelessWidget {
  MaterialForgotPasswordView({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Forgot Password'),
      ),
      body: Padding(
        // TODO: allow customers to override padding
        padding: const EdgeInsets.all(16.0),
        child: MaterialForgotPasswordForm(),
      ),
    );
  }
}

class MaterialForgotPasswordForm extends StatelessWidget {
  const MaterialForgotPasswordForm({
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
