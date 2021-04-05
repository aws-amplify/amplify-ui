import 'package:flutter/material.dart';

import 'buttons.dart';
import 'verification_code_form_field.dart';

class MaterialConfirmSignUpView extends StatelessWidget {
  MaterialConfirmSignUpView();

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
