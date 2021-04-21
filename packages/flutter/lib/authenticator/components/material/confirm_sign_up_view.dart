import 'package:flutter/material.dart';

import 'buttons.dart';
import 'verification_code_form_field.dart';

class MaterialConfirmSignUpView extends StatelessWidget {
  MaterialConfirmSignUpView({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Verify Account'),
      ),
      body: Padding(
        // TODO: allow customers to override padding
        padding: const EdgeInsets.all(16.0),
        child: MaterialConfirmSignUpForm(),
      ),
    );
  }
}

class MaterialConfirmSignUpForm extends StatelessWidget {
  const MaterialConfirmSignUpForm({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          VerificationCodeFormField(),
          SizedBox(height: 12.0),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              ConfirmVerificationCodeButton(),
            ],
          )
        ],
      ),
    );
  }
}
