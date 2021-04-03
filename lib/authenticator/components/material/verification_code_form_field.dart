import 'package:flutter/material.dart';

import '../../authenticator.dart';

class VerificationCodeFormField extends StatelessWidget {
  const VerificationCodeFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthenticatorFormFieldState state =
        AuthenticatorStateProvider.of(context).verificationCodeFormFieldState;
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        AuthenticatorStateProvider.dispatch(
          context,
          SetVerificationCodeAction(value),
        );
      },
      obscureText: true,
    );
  }
}
